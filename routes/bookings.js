const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Theater = require('../models/Theater');
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');
const QRCode = require('qrcode');

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('movie', 'title poster language genre')
      .populate('theater', 'name address')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('movie', 'title poster duration language genre rating')
      .populate('theater', 'name address screens')
      .populate('user', 'name email phone');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new booking
router.post('/', auth, async (req, res) => {
  try {
    const {
      theaterId,
      movieId,
      showId,
      selectedSeats,
      showTime,
      screen,
      totalAmount,
      paymentMethod
    } = req.body;
    
    // Validate theater and show exist
    const theater = await Theater.findById(theaterId);
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    
    const show = theater.shows.id(showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }
    
    // Check if selected seats are available
    const unavailableSeats = [];
    selectedSeats.forEach(selectedSeat => {
      const seat = show.seats.find(s => 
        s.seatNumber === selectedSeat.seatNumber && s.row === selectedSeat.row
      );
      if (!seat || !seat.isAvailable) {
        unavailableSeats.push(`${selectedSeat.row}${selectedSeat.seatNumber}`);
      }
    });
    
    if (unavailableSeats.length > 0) {
      return res.status(400).json({ 
        message: 'Some seats are no longer available',
        unavailableSeats 
      });
    }
    
    // Create booking
    const booking = new Booking({
      user: req.user.id,
      theater: theaterId,
      movie: movieId,
      showTime: new Date(showTime),
      screen,
      seats: selectedSeats,
      totalAmount,
      paymentMethod,
      status: 'pending'
    });
    
    await booking.save();
    
    // Mark seats as unavailable
    selectedSeats.forEach(selectedSeat => {
      const seat = show.seats.find(s => 
        s.seatNumber === selectedSeat.seatNumber && s.row === selectedSeat.row
      );
      if (seat) {
        seat.isAvailable = false;
      }
    });
    
    await theater.save();
    
    // Populate booking details for response
    await booking.populate('movie', 'title poster duration language');
    await booking.populate('theater', 'name address');
    
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Confirm booking after successful payment
router.patch('/:id/confirm', auth, async (req, res) => {
  try {
    const { transactionId } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user owns this booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Generate QR code for digital ticket
    const qrData = {
      bookingId: booking.bookingId,
      movieTitle: booking.movie,
      theaterName: booking.theater,
      showTime: booking.showTime,
      seats: booking.seats.map(s => `${s.row}${s.seatNumber}`).join(', '),
      totalAmount: booking.totalAmount
    };
    
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrData));
    
    // Update booking status
    booking.status = 'confirmed';
    booking.paymentStatus = 'completed';
    booking.transactionId = transactionId;
    booking.qrCode = qrCodeDataURL;
    
    await booking.save();
    
    // Populate booking details for response
    await booking.populate('movie', 'title poster duration language');
    await booking.populate('theater', 'name address');
    
    res.json(booking);
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel booking
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user owns this booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Check if booking can be cancelled (e.g., not within 2 hours of show time)
    const showTime = new Date(booking.showTime);
    const now = new Date();
    const timeDiff = showTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    
    if (hoursDiff < 2) {
      return res.status(400).json({ 
        message: 'Cannot cancel booking within 2 hours of show time' 
      });
    }
    
    // Update booking status
    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();
    
    // Make seats available again
    const theater = await Theater.findById(booking.theater);
    if (theater) {
      const show = theater.shows.find(s => 
        s.showTime.getTime() === showTime.getTime() && 
        s.screen === booking.screen
      );
      
      if (show) {
        booking.seats.forEach(bookedSeat => {
          const seat = show.seats.find(s => 
            s.seatNumber === bookedSeat.seatNumber && s.row === bookedSeat.row
          );
          if (seat) {
            seat.isAvailable = true;
          }
        });
        
        await theater.save();
      }
    }
    
    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get booking statistics (admin only)
router.get('/admin/stats', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    
    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    
    const monthlyBookings = await Booking.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);
    
    res.json({
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      pendingBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      monthlyBookings
    });
  } catch (error) {
    console.error('Error fetching booking stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;