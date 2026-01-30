import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const { t } = useLanguage();
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const languages = [
    { code: 'tamil', name: 'Tamil', flag: '🇮🇳', color: '#ff6b6b' },
    { code: 'telugu', name: 'Telugu', flag: '🇮🇳', color: '#4ecdc4' },
    { code: 'english', name: 'English', flag: '🇺🇸', color: '#45b7d1' },
    { code: 'hindi', name: 'Hindi', flag: '🇮🇳', color: '#f9ca24' },
    { code: 'spanish', name: 'Spanish', flag: '🇪🇸', color: '#f0932b' },
    { code: 'japanese', name: 'Japanese', flag: '🇯🇵', color: '#eb4d4b' },
    { code: 'chinese', name: 'Chinese', flag: '🇨🇳', color: '#6c5ce7' }
  ];

  const genres = [
    { name: 'Action', icon: '💥', color: '#e74c3c' },
    { name: 'Thriller', icon: '🔥', color: '#e67e22' },
    { name: 'Horror', icon: '👻', color: '#8e44ad' },
    { name: 'Comedy', icon: '😂', color: '#f39c12' },
    { name: 'Romance', icon: '💕', color: '#e91e63' },
    { name: 'Drama', icon: '🎭', color: '#3498db' },
    { name: 'Sci-Fi', icon: '🚀', color: '#9b59b6' },
    { name: 'Fantasy', icon: '🧙‍♂️', color: '#1abc9c' }
  ];

  useEffect(() => {
    fetchFeaturedMovies();
  }, []);

  const fetchFeaturedMovies = async () => {
    try {
      const response = await axios.get('/api/movies?status=now_showing');
      setFeaturedMovies(response.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Book My Film</h1>
          <p className="hero-subtitle">Experience Cinema Like Never Before</p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">🎬</span>
              <span>Multi-Language Movies</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <span>Real-time Seat Selection</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💳</span>
              <span>Secure Payments</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📱</span>
              <span>Instant Digital Tickets</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Languages Section */}
        <section className="languages-section">
          <h2 className="section-title">{t('languages')}</h2>
          <div className="languages-grid">
            {languages.map((language) => (
              <Link
                key={language.code}
                to={`/movies/${language.code}`}
                className="language-card"
                style={{ '--card-color': language.color }}
              >
                <div className="language-flag">{language.flag}</div>
                <h3 className="language-name">{language.name}</h3>
                <p className="language-subtitle">Explore {language.name} Cinema</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 3D Experience Section */}
        <section className="experience-3d-section">
          <div className="experience-3d-card">
            <div className="experience-content">
              <h2 className="experience-title">{t('experience3D')}</h2>
              <p className="experience-subtitle">
                Immerse yourself in stunning 3D visuals with preview videos before booking
              </p>
              <Link to="/movies?is3D=true" className="btn btn-accent">
                Explore 3D Movies
              </Link>
            </div>
            <div className="experience-visual">
              <div className="floating-3d">3D</div>
            </div>
          </div>
        </section>

        {/* Genres Section */}
        <section className="genres-section">
          <h2 className="section-title">{t('genres')}</h2>
          <div className="genres-grid">
            {genres.map((genre) => (
              <Link
                key={genre.name}
                to={`/movies?genre=${genre.name.toLowerCase()}`}
                className="genre-card"
                style={{ '--genre-color': genre.color }}
              >
                <div className="genre-icon">{genre.icon}</div>
                <h3 className="genre-name">{genre.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Movies */}
        <section className="featured-movies">
          <h2 className="section-title">{t('nowShowing')}</h2>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="movies-grid">
              {featuredMovies.map((movie) => (
                <Link key={movie._id} to={`/movie/${movie._id}`} className="movie-card">
                  <div className="movie-poster">
                    <img src={movie.poster} alt={movie.title.english} />
                    {movie.is3D && <div className="badge-3d">3D</div>}
                  </div>
                  <div className="movie-info">
                    <h3 className="movie-title">{movie.title.english}</h3>
                    <p className="movie-genre">{movie.genre.join(', ')}</p>
                    <div className="movie-meta">
                      <span className="movie-language">{movie.language}</span>
                      <span className="movie-rating">{movie.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;