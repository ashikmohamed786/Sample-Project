import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [moviesByLanguage, setMoviesByLanguage] = useState({});
  const [loading, setLoading] = useState(true);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'hindi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'telugu', name: 'Telugu', flag: '🎭' },
    { code: 'tamil', name: 'Tamil', flag: '🎪' },
    { code: 'kannada', name: 'Kannada', flag: '🎨' },
    { code: 'malayalam', name: 'Malayalam', flag: '🌴' }
  ];

  useEffect(() => {
    fetchMoviesByLanguage();
  }, []);

  const fetchMoviesByLanguage = async () => {
    try {
      const allMovies = await axios.get('/api/movies');
      const movies = allMovies.data;
      
      // Group movies by language
      const grouped = {};
      const featured = [];
      
      languages.forEach(lang => {
        const langMovies = movies.filter(movie => movie.language === lang.code);
        grouped[lang.code] = langMovies;
        
        // Add top-rated movie from each language to featured
        if (langMovies.length > 0) {
          const topMovie = langMovies.reduce((prev, current) => 
            (prev.rating > current.rating) ? prev : current
          );
          featured.push(topMovie);
        }
      });
      
      setMoviesByLanguage(grouped);
      setFeaturedMovies(featured);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleLanguageClick = (languageCode) => {
    navigate(`/movies/${languageCode}`);
  };

  const handleViewAllMovies = () => {
    navigate('/movies');
  };

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner"></div>
        <p>Loading amazing movies...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-name">Book My Film</span>
          </h1>
          <p className="hero-subtitle">
            Discover amazing movies in your favorite language
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">30+</span>
              <span className="stat-label">Movies</span>
            </div>
            <div className="stat">
              <span className="stat-number">6</span>
              <span className="stat-label">Languages</span>
            </div>
            <div className="stat">
              <span className="stat-number">5</span>
              <span className="stat-label">Theaters</span>
            </div>
          </div>
          <button className="cta-button" onClick={handleViewAllMovies}>
            Explore All Movies
          </button>
        </div>
        <div className="hero-visual">
          <div className="floating-movie-cards">
            {featuredMovies.slice(0, 3).map((movie, index) => (
              <div 
                key={movie._id} 
                className={`floating-card card-${index + 1}`}
                onClick={() => handleMovieClick(movie._id)}
              >
                <img 
                  src={movie.poster || '/placeholder-movie.jpg'} 
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = '/placeholder-movie.jpg';
                  }}
                />
                <div className="card-overlay">
                  <h4>{movie.title}</h4>
                  <p>⭐ {movie.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>🌟 Featured Movies</h2>
          <p>Top-rated films from each language</p>
        </div>
        <div className="featured-movies">
          {featuredMovies.map((movie) => (
            <div 
              key={movie._id} 
              className="featured-movie-card"
              onClick={() => handleMovieClick(movie._id)}
            >
              <div className="movie-poster">
                <img 
                  src={movie.poster || '/placeholder-movie.jpg'} 
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = '/placeholder-movie.jpg';
                  }}
                />
                <div className="movie-rating">⭐ {movie.rating}</div>
                {movie.is3D && <div className="badge-3d">3D</div>}
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p className="movie-language">
                  {languages.find(l => l.code === movie.language)?.flag} {' '}
                  {languages.find(l => l.code === movie.language)?.name}
                </p>
                <p className="movie-genre">{movie.genre?.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Movies by Language Sections */}
      {languages.map((language) => {
        const movies = moviesByLanguage[language.code] || [];
        if (movies.length === 0) return null;

        return (
          <section key={language.code} className="language-section">
            <div className="section-header">
              <h2>
                {language.flag} {language.name} Movies
                <span className="movie-count">({movies.length} films)</span>
              </h2>
              <button 
                className="view-all-btn"
                onClick={() => handleLanguageClick(language.code)}
              >
                View All {language.name} Movies →
              </button>
            </div>
            
            <div className="movies-carousel">
              <div className="movies-scroll">
                {movies.map((movie) => (
                  <div 
                    key={movie._id} 
                    className="movie-card"
                    onClick={() => handleMovieClick(movie._id)}
                  >
                    <div className="movie-poster">
                      <img 
                        src={movie.poster || '/placeholder-movie.jpg'} 
                        alt={movie.title}
                        onError={(e) => {
                          e.target.src = '/placeholder-movie.jpg';
                        }}
                      />
                      <div className="movie-overlay">
                        <div className="movie-rating">⭐ {movie.rating}</div>
                        {movie.is3D && <div className="badge-3d">3D</div>}
                        <div className="movie-duration">{movie.duration} min</div>
                      </div>
                    </div>
                    <div className="movie-details">
                      <h4 className="movie-title">{movie.title}</h4>
                      <p className="movie-genre">{movie.genre?.slice(0, 2).join(', ')}</p>
                      <div className="movie-meta">
                        <span className="release-year">
                          {new Date(movie.releaseDate).getFullYear()}
                        </span>
                        <span className="movie-status">{movie.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Quick Actions Section */}
      <section className="quick-actions-section">
        <div className="section-header">
          <h2>🎬 Quick Actions</h2>
          <p>Find what you're looking for</p>
        </div>
        <div className="quick-actions">
          <div className="action-card" onClick={() => navigate('/movies?filter=3d')}>
            <div className="action-icon">🕶️</div>
            <h3>3D Movies</h3>
            <p>Experience cinema in 3D</p>
          </div>
          <div className="action-card" onClick={() => navigate('/movies?genre=action')}>
            <div className="action-icon">💥</div>
            <h3>Action Movies</h3>
            <p>High-octane entertainment</p>
          </div>
          <div className="action-card" onClick={() => navigate('/movies?genre=comedy')}>
            <div className="action-icon">😂</div>
            <h3>Comedy Movies</h3>
            <p>Laugh out loud moments</p>
          </div>
          <div className="action-card" onClick={() => navigate('/movies?genre=drama')}>
            <div className="action-icon">🎭</div>
            <h3>Drama Movies</h3>
            <p>Emotional storytelling</p>
          </div>
        </div>
      </section>

      {/* Language Navigation */}
      <section className="language-nav-section">
        <div className="section-header">
          <h2>🌍 Browse by Language</h2>
          <p>Explore movies in your preferred language</p>
        </div>
        <div className="language-grid">
          {languages.map((language) => {
            const movieCount = moviesByLanguage[language.code]?.length || 0;
            return (
              <div 
                key={language.code}
                className="language-card"
                onClick={() => handleLanguageClick(language.code)}
              >
                <div className="language-flag">{language.flag}</div>
                <h3>{language.name}</h3>
                <p>{movieCount} Movies Available</p>
                <div className="language-preview">
                  {moviesByLanguage[language.code]?.slice(0, 3).map((movie, index) => (
                    <div key={movie._id} className="preview-poster">
                      <img 
                        src={movie.poster || '/placeholder-movie.jpg'} 
                        alt={movie.title}
                        onError={(e) => {
                          e.target.src = '/placeholder-movie.jpg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;