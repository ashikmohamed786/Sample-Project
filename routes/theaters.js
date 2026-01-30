const express = require('express');
const router = express.Router();
const Theater = require('../models/Theater');
const auth = require('../middleware/auth');

// Get all theaters
router.get('/', async (req, res) => {
  try {
    const { city, movie } = req.query;
    let query = { isActive: true };
    
    if (city) {
      query['address.city'] = new RegExp(city, 'i');
    }
    
    const theaters = await Theater.find(query)
      .populate('shows.movie', 'title poster duration language genre')
      .select('-__v');
    
    // Filter theaters by movie if specified
    let filteredTheaters = theaters;
    if (movie) {
      filteredTheaters = theaters.filter(theater => 
        theater.shows.some(show => show.movie._id.toString() === movie)
      );
    }
    
    res.json(filteredTheaters);
  } catch (error) {
    console.error('Error fetching theaters:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get theater by ID
router.get('/:id', async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id)
      .populate('shows.movie', 'title poster duration language genre rating')
      .populate('owner', 'name email');
    
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    
    res.json(theater);
  } catch (error) {
    console.error('Error fetching theater:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get shows for a specific theater and movie
router.get('/:theaterId/shows/:movieId', async (req, res) => {
  try {
    const { theaterId, movieId } = req.params;
    const { date } = req.query;
    
    const theater = await Theater.findById(theaterId)
      .populate('shows.movie', 'title duration');
    
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    
    let shows = theater.shows.filter(show => 
      show.movie._id.toString() === movieId
    );
    
    // Filter by date if provided
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      shows = shows.filter(show => 
        show.showTime >= searchDate && show.showTime < nextDay
      );
    }
    
    res.json(shows);
  } catch (error) {
    console.error('Error fetching shows:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get seat layout for a specific show
router.get('/:theaterId/shows/:showId/seats', async (req, res) => {
  try {
    const { theaterId, showId } = req.params;
    
    const theater = await Theater.findById(theaterId);
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    
    const show = theater.shows.id(showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }
    
    res.json({
      showId: show._id,
      seats: show.seats,
      basePrice: show.basePrice,
      couplesSeatPrice: show.couplesSeatPrice
    });
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new theater (theater owner only)
router.post('/', auth, async (req, res) => {
  try {
    const theaterData = {
      ...req.body,
      owner: req.user.id
    };
    
    const theater = new Theater(theaterData);
    await theater.save();
    
    res.status(201).json(theater);
  } catch (error) {
    console.error('Error creating theater:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add show to theater
router.post('/:id/shows', auth, async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    
    // Check if user owns the theater
    if (theater.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Generate seat layout for the show
    const seatLayout = generateSeatLayout(req.body.screen, theater);
    
    const newShow = {
      ...req.body,
      seats: seatLayout
    };
    
    theater.shows.push(newShow);
    await theater.save();
    
    res.status(201).json(theater.shows[theater.shows.length - 1]);
  } catch (error) {
    console.error('Error adding show:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update seat availability
router.patch('/:theaterId/shows/:showId/seats', async (req, res) => {
  try {
    const { theaterId, showId } = req.params;
    const { seatUpdates } = req.body;
    
    const theater = await Theater.findById(theaterId);
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    
    const show = theater.shows.id(showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }
    
    // Update seat availability
    seatUpdates.forEach(update => {
      const seat = show.seats.find(s => 
        s.seatNumber === update.seatNumber && s.row === update.row
      );
      if (seat) {
        seat.isAvailable = update.isAvailable;
      }
    });
    
    await theater.save();
    
    res.json({ message: 'Seats updated successfully' });
  } catch (error) {
    console.error('Error updating seats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to generate seat layout
function generateSeatLayout(screenNumber, theater) {
  const screen = theater.screens.find(s => s.screenNumber === screenNumber);
  if (!screen) return [];
  
  const seats = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  
  for (let i = 0; i < screen.seatLayout.rows; i++) {
    for (let j = 1; j <= screen.seatLayout.seatsPerRow; j++) {
      const seatType = i < 2 ? 'common' : i < 4 ? 'friends' : i < 6 ? 'family' : 'couples';
      const basePrice = 150;
      const priceMultiplier = seatType === 'couples' ? 2 : seatType === 'family' ? 1.5 : seatType === 'friends' ? 1.2 : 1;
      
      seats.push({
        seatNumber: j.toString().padStart(2, '0'),
        row: rows[i],
        type: seatType,
        price: Math.round(basePrice * priceMultiplier),
        isAvailable: true
      });
    }
  }
  
  return seats;
}

module.exports = router;