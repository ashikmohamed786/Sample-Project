import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getMovies, getMoviesByLanguage } from '../services/mockDataService';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { language } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      let movieData;
      
      if (language && language !== 'all') {
        movieData = await getMoviesByLanguage(language);
      } else {
        movieData = await getMovies();
      }
      
      // Apply filters
      let filteredMovies = movieData;
      if (filter !== 'all') {
        if (filter === '3d') {
          filteredMovies = movieData.filter(movie => movie.is3D);
        } else {
          filteredMovies = movieData.filter(movie => 
            movie.genre && movie.genre.some(g => 
              g.toLowerCase() === filter.toLowerCase()
            )
          );
        }
      }
      
      setMovies(filteredMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [language, filter]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) {
    return (
      <div className="movies-loading">
        <div className="loading-spinner"></div>
        <p>{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className="movies-container">
      <div className="movies-header">
        <h1>{language ? `${language.toUpperCase()} Movies` : 'All Movies'}</h1>
        
        <div className="movies-filters">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Genres</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
            <option value="3d">3D Movies</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {movies.length === 0 ? (
          <div className="no-movies">
            <p>No movies found for the selected criteria.</p>
          </div>
        ) : (
          movies.map((movie) => (
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
                {movie.is3D && <span className="badge-3d">3D</span>}
                <div className="movie-rating">
                  ⭐ {movie.rating || 'N/A'}
                </div>
              </div>
              
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-language">{movie.language}</p>
                <p className="movie-genre">{movie.genre?.join(', ')}</p>
                <p className="movie-duration">{movie.duration} min</p>
                <div className="movie-status">
                  <span className={`status ${movie.status}`}>
                    {movie.status === 'now_showing' ? 'Now Showing' : 
                     movie.status === 'coming_soon' ? 'Coming Soon' : 
                     movie.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Movies;