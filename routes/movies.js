const express = require('express');
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');
const { mockMovies } = require('../mock-data');

const router = express.Router();

// Get all movies with filters
router.get('/', async (req, res) => {
  try {
    const { language, genre, is3D, status } = req.query;
    
    // Try database first, fallback to mock data
    let movies;
    try {
      const filter = {};
      if (language) filter.language = language;
      if (genre) filter.genre = { $in: [genre] };
      if (is3D !== undefined) filter.is3D = is3D === 'true';
      if (status) filter.status = status;
      
      movies = await Movie.find(filter).sort({ releaseDate: -1 });
    } catch (dbError) {
      console.log('Using mock data - MongoDB not available');
      movies = mockMovies.filter(movie => {
        if (language && movie.language !== language) return false;
        if (genre && !movie.genre.includes(genre)) return false;
        if (is3D !== undefined && movie.is3D !== (is3D === 'true')) return false;
        if (status && movie.status !== status) return false;
        return true;
      });
    }
    
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    let movie;
    try {
      movie = await Movie.findById(req.params.id);
    } catch (dbError) {
      console.log('Using mock data - MongoDB not available');
      movie = mockMovies.find(m => m._id === req.params.id);
    }
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get movies by language
router.get('/language/:lang', async (req, res) => {
  try {
    const movies = await Movie.find({ 
      language: req.params.lang,
      status: 'now_showing'
    }).sort({ releaseDate: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get movies by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const movies = await Movie.find({ 
      genre: { $in: [req.params.genre] },
      status: 'now_showing'
    }).sort({ releaseDate: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get 3D movies
router.get('/3d/all', async (req, res) => {
  try {
    const movies = await Movie.find({ 
      is3D: true,
      status: 'now_showing'
    }).sort({ releaseDate: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create movie (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;