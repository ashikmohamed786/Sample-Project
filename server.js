const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Import routes
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const theaterRoutes = require('./routes/theaters');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payments');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookmyfilm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((error) => {
  console.log('❌ MongoDB connection error:', error.message);
  console.log('⚠️  Server will continue without database connection');
});

// Socket.io for real-time seat updates
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-show', (showId) => {
    socket.join(showId);
  });
  
  socket.on('seat-selected', (data) => {
    socket.to(data.showId).emit('seat-update', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Basic health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Book My Film API is running!', 
    status: 'success',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      movies: '/api/movies',
      theaters: '/api/theaters',
      bookings: '/api/bookings',
      payments: '/api/payments'
    }
  });
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});