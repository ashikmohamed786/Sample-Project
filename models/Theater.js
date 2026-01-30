const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true
  },
  row: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['common', 'friends', 'family', 'couples'],
    default: 'common'
  },
  price: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  showTime: {
    type: Date,
    required: true
  },
  screen: {
    type: String,
    required: true
  },
  seats: [seatSchema],
  basePrice: {
    type: Number,
    required: true
  },
  couplesSeatPrice: {
    type: Number,
    required: true
  }
});

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  screens: [{
    screenNumber: String,
    totalSeats: Number,
    seatLayout: {
      rows: Number,
      seatsPerRow: Number
    }
  }],
  shows: [showSchema],
  amenities: [String],
  images: [String],
  rating: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Theater', theaterSchema);