const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const Theater = require('./models/Theater');
const User = require('./models/User');
require('dotenv').config();

const sampleMovies = [
  {
    title: "Avengers: Endgame",
    description: "The epic conclusion to the Infinity Saga that became a defining moment in cinematic history.",
    genre: ["Action", "Adventure", "Drama"],
    language: "english",
    duration: 181,
    rating: 8.4,
    releaseDate: new Date('2019-04-26'),
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    status: "now_showing",
    is3D: true,
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"]
  },
  {
    title: "RRR",
    description: "A fictional story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.",
    genre: ["Action", "Drama"],
    language: "telugu",
    duration: 187,
    rating: 7.9,
    releaseDate: new Date('2022-03-25'),
    poster: "https://image.tmdb.org/t/p/w500/w7RDub7osuFVdoOp3rkzD4Nqxmw.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/8rpDcsfLJypbO6vREc0547VKqEv.jpg",
    status: "now_showing",
    is3D: false,
    director: "S.S. Rajamouli",
    cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt", "Ajay Devgn"]
  },
  {
    title: "Spider-Man: No Way Home",
    description: "Peter Parker's secret identity is revealed to the entire world. Desperate for help, Peter turns to Doctor Strange.",
    genre: ["Action", "Adventure", "Fantasy"],
    language: "english",
    duration: 148,
    rating: 8.2,
    releaseDate: new Date('2021-12-17'),
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    status: "now_showing",
    is3D: true,
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon"]
  },
  {
    title: "KGF Chapter 2",
    description: "The blood-soaked land of Kolar Gold Fields (KGF) has a new overlord now - Rocky, whose name strikes fear in the heart of his foes.",
    genre: ["Action", "Drama"],
    language: "kannada",
    duration: 168,
    rating: 8.3,
    releaseDate: new Date('2022-04-14'),
    poster: "https://image.tmdb.org/t/p/w500/lP7dJpzjn0IcINAXoNaHVHv2G0E.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
    status: "now_showing",
    is3D: false,
    director: "Prashanth Neel",
    cast: ["Yash", "Sanjay Dutt", "Raveena Tandon", "Srinidhi Shetty"]
  },
  {
    title: "Dangal",
    description: "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games.",
    genre: ["Biography", "Drama", "Sport"],
    language: "hindi",
    duration: 161,
    rating: 8.4,
    releaseDate: new Date('2016-12-23'),
    poster: "https://image.tmdb.org/t/p/w500/lP7dJpzjn0IcINAXoNaHVHv2G0E.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
    status: "now_showing",
    is3D: false,
    director: "Nitesh Tiwari",
    cast: ["Aamir Khan", "Fatima Sana Shaikh", "Sanya Malhotra", "Zaira Wasim"]
  },
  {
    title: "Vikram",
    description: "Members of a black ops team must track and eliminate a gang of masked murderers.",
    genre: ["Action", "Crime", "Thriller"],
    language: "tamil",
    duration: 174,
    rating: 8.2,
    releaseDate: new Date('2022-06-03'),
    poster: "https://image.tmdb.org/t/p/w500/lP7dJpzjn0IcINAXoNaHVHv2G0E.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
    status: "now_showing",
    is3D: false,
    director: "Lokesh Kanagaraj",
    cast: ["Kamal Haasan", "Vijay Sethupathi", "Fahadh Faasil", "Narain"]
  }
];

const sampleTheaters = [
  {
    name: "PVR Cinemas - Forum Mall",
    address: {
      street: "21, Hosur Road, Adugodi",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560030",
      country: "India"
    },
    location: {
      type: "Point",
      coordinates: [77.6099, 12.9352]
    },
    screens: [
      {
        screenNumber: "1",
        totalSeats: 150,
        seatLayout: { rows: 10, seatsPerRow: 15 }
      },
      {
        screenNumber: "2", 
        totalSeats: 200,
        seatLayout: { rows: 12, seatsPerRow: 17 }
      }
    ],
    amenities: ["3D", "Dolby Atmos", "Recliner Seats", "Food Court", "Parking"],
    rating: 4.2,
    isActive: true
  },
  {
    name: "INOX - Garuda Mall",
    address: {
      street: "Magrath Road, Ashok Nagar",
      city: "Bangalore", 
      state: "Karnataka",
      zipCode: "560025",
      country: "India"
    },
    location: {
      type: "Point",
      coordinates: [77.6040, 12.9698]
    },
    screens: [
      {
        screenNumber: "1",
        totalSeats: 180,
        seatLayout: { rows: 12, seatsPerRow: 15 }
      }
    ],
    amenities: ["IMAX", "Premium Seats", "Food & Beverages", "Parking"],
    rating: 4.0,
    isActive: true
  },
  {
    name: "Cinepolis - Nexus Mall",
    address: {
      street: "Koramangala, 4th Block",
      city: "Bangalore",
      state: "Karnataka", 
      zipCode: "560034",
      country: "India"
    },
    location: {
      type: "Point",
      coordinates: [77.6271, 12.9279]
    },
    screens: [
      {
        screenNumber: "1",
        totalSeats: 120,
        seatLayout: { rows: 8, seatsPerRow: 15 }
      },
      {
        screenNumber: "2",
        totalSeats: 160,
        seatLayout: { rows: 10, seatsPerRow: 16 }
      }
    ],
    amenities: ["4DX", "VIP Lounge", "Gourmet Food", "Valet Parking"],
    rating: 4.5,
    isActive: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookmyfilm', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Clear existing data
    await Movie.deleteMany({});
    await Theater.deleteMany({});
    console.log('Cleared existing data');

    // Create a demo user first
    const demoUser = new User({
      name: 'Demo User',
      email: 'demo@bookmyfilm.com',
      password: 'demo123',
      phone: '9876543210',
      preferredLanguage: 'english',
      role: 'user'
    });
    await demoUser.save();
    console.log('Created demo user');

    // Insert movies
    const movies = await Movie.insertMany(sampleMovies);
    console.log(`Inserted ${movies.length} movies`);

    // Insert theaters with shows
    for (let theaterData of sampleTheaters) {
      theaterData.owner = demoUser._id;
      
      // Generate shows for each theater
      theaterData.shows = [];
      
      // Create shows for next 7 days
      for (let day = 0; day < 7; day++) {
        const showDate = new Date();
        showDate.setDate(showDate.getDate() + day);
        
        // Create 3 shows per day for each screen
        for (let screen of theaterData.screens) {
          const showTimes = ['10:00', '14:30', '18:00', '21:30'];
          
          for (let timeSlot of showTimes) {
            const [hours, minutes] = timeSlot.split(':');
            const showTime = new Date(showDate);
            showTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            
            // Pick a random movie for this show
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            
            // Generate seat layout
            const seats = generateSeatLayout(screen);
            
            theaterData.shows.push({
              movie: randomMovie._id,
              showTime: showTime,
              screen: screen.screenNumber,
              seats: seats,
              basePrice: 150 + Math.floor(Math.random() * 100), // Random price between 150-250
              couplesSeatPrice: 300 + Math.floor(Math.random() * 100)
            });
          }
        }
      }
      
      const theater = new Theater(theaterData);
      await theater.save();
    }
    
    console.log(`Inserted ${sampleTheaters.length} theaters with shows`);
    console.log('Database seeded successfully!');
    
    console.log('\n🎉 Sample data created:');
    console.log('📧 Demo Login: demo@bookmyfilm.com');
    console.log('🔑 Password: demo123');
    console.log('🎬 Movies: 6 movies across different languages');
    console.log('🏢 Theaters: 3 theaters with multiple shows');
    console.log('📅 Shows: Next 7 days with multiple time slots');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

function generateSeatLayout(screen) {
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

// Run the seeder
seedDatabase();