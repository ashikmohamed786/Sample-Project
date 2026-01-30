const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: Map,
    of: String,
    required: true // {english: "Movie Title", tamil: "திரைப்படம்", etc.}
  },
  description: {
    type: Map,
    of: String,
    required: true
  },
  genre: [{
    type: String,
    enum: ['action', 'thriller', 'horror', 'comedy', 'romance', 'drama', 'sci-fi', 'fantasy', 'adventure']
  }],
  language: {
    type: String,
    required: true,
    enum: ['tamil', 'telugu', 'english', 'hindi', 'spanish', 'japanese', 'chinese', 'korean', 'french']
  },
  duration: {
    type: Number,
    required: true // in minutes
  },
  rating: {
    type: String,
    enum: ['U', 'UA', 'A', 'S'],
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  trailer: {
    type: String
  },
  is3D: {
    type: Boolean,
    default: false
  },
  previewVideo: {
    type: String // 3D experience preview video URL
  },
  cast: [{
    name: String,
    role: String,
    image: String
  }],
  director: {
    type: String,
    required: true
  },
  producer: {
    type: String
  },
  status: {
    type: String,
    enum: ['coming_soon', 'now_showing', 'ended'],
    default: 'coming_soon'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);