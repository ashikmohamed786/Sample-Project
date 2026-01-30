import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import './MovieDetail.css';

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    fetchMovieDetails();
    fetchTheaters();
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`/api/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchTheaters = async () => {
    try {
      const response = await axios.get(`/api/theaters?movie=${id}`);
      setTheaters(response.data);
    } catch (error) {
      console.error('Error fetching theaters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowSelection = (theaterId, showId) => {
    navigate(`/seats/${theaterId}/${showId}`);
  };

  const getNextSevenDays = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    return dates;
  };

  if (loading || !movie) {
    return (
      <div className="movie-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-hero">
        <div className="movie-backdrop">
          <img 
            src={movie.backdrop || movie.poster || '/placeholder-backdrop.jpg'} 
            alt={movie.title}
            onError={(e) => {
              e.target.src = '/placeholder-backdrop.jpg';
            }}
          />
          <div className="backdrop-overlay"></div>
        </div>
        
        <div className="movie-hero-content">
          <div className="movie-poster-large">
            <img 
              src={movie.poster || '/placeholder-movie.jpg'} 
              alt={movie.title}
              onError={(e) => {
                e.target.src = '/placeholder-movie.jpg';
              }}
            />
            {movie.is3D && <span className="badge-3d">3D</span>}
          </div>
          
          <div className="movie-details">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-meta">
              <span className="rating">⭐ {movie.rating || 'N/A'}</span>
              <span className="duration">{movie.duration} min</span>
              <span className="language">{movie.language}</span>
              <span className={`status ${movie.status}`}>
                {movie.status === 'now_showing' ? 'Now Showing' : 
                 movie.status === 'coming_soon' ? 'Coming Soon' : 
                 movie.status}
              </span>
            </div>
            
            <div className="movie-genres">
              {movie.genre?.map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))}
            </div>
            
            <p className="movie-description">
              {movie.description || 'Experience this amazing movie in theaters now!'}
            </p>
            
            <div className="movie-info-grid">
              <div className="info-item">
                <strong>Release Date:</strong>
                <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <strong>Director:</strong>
                <span>{movie.director || 'N/A'}</span>
              </div>
              <div className="info-item">
                <strong>Cast:</strong>
                <span>{movie.cast?.join(', ') || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="showtimes-section">
        <h2>Book Tickets</h2>
        
        <div className="date-selector">
          <h3>Select Date</h3>
          <div className="date-buttons">
            {getNextSevenDays().map((date) => (
              <button
                key={date.value}
                className={`date-btn ${selectedDate === date.value ? 'active' : ''}`}
                onClick={() => setSelectedDate(date.value)}
              >
                {date.label}
              </button>
            ))}
          </div>
        </div>

        <div className="theaters-list">
          {theaters.length === 0 ? (
            <div className="no-theaters">
              <p>No theaters available for this movie.</p>
            </div>
          ) : (
            theaters.map((theater) => (
              <div key={theater._id} className="theater-card">
                <div className="theater-info">
                  <h3 className="theater-name">{theater.name}</h3>
                  <p className="theater-address">
                    {theater.address?.street}, {theater.address?.city}
                  </p>
                  <div className="theater-amenities">
                    {theater.amenities?.map((amenity, index) => (
                      <span key={index} className="amenity">{amenity}</span>
                    ))}
                  </div>
                </div>
                
                <div className="showtimes">
                  {theater.shows
                    ?.filter(show => 
                      show.movie._id === id && 
                      new Date(show.showTime).toDateString() === new Date(selectedDate).toDateString()
                    )
                    .map((show) => (
                      <button
                        key={show._id}
                        className="showtime-btn"
                        onClick={() => handleShowSelection(theater._id, show._id)}
                      >
                        <div className="show-time">
                          {new Date(show.showTime).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className="show-screen">Screen {show.screen}</div>
                        <div className="show-price">₹{show.basePrice}</div>
                      </button>
                    )) || (
                    <p className="no-shows">No shows available for selected date</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;