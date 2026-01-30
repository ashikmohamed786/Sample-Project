import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (token) {
      fetchBookings();
    }
  }, [token]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings/my-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await axios.patch(`/api/bookings/${bookingId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Booking cancelled successfully');
      fetchBookings(); // Refresh bookings
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#28a745';
      case 'pending': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="not-logged-in">
          <h2>Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="user-info">
          <div className="user-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <span className="user-language">
              Preferred Language: {user.preferredLanguage}
            </span>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="section">
          <h2>My Bookings</h2>
          
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading your bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="no-bookings">
              <p>You haven't made any bookings yet.</p>
              <a href="/movies" className="browse-movies-btn">
                Browse Movies
              </a>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking._id} className="booking-card">
                  <div className="booking-header">
                    <div className="movie-info">
                      <img 
                        src={booking.movie?.poster || '/placeholder-movie.jpg'} 
                        alt={booking.movie?.title}
                        className="movie-poster-small"
                        onError={(e) => {
                          e.target.src = '/placeholder-movie.jpg';
                        }}
                      />
                      <div>
                        <h3>{booking.movie?.title}</h3>
                        <p className="theater-name">{booking.theater?.name}</p>
                        <p className="booking-id">Booking ID: {booking.bookingId}</p>
                      </div>
                    </div>
                    <div className="booking-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(booking.status) }}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="booking-details">
                    <div className="detail-item">
                      <strong>Show Time:</strong>
                      <span>
                        {new Date(booking.showTime).toLocaleDateString()} at{' '}
                        {new Date(booking.showTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    
                    <div className="detail-item">
                      <strong>Screen:</strong>
                      <span>{booking.screen}</span>
                    </div>
                    
                    <div className="detail-item">
                      <strong>Seats:</strong>
                      <span>
                        {booking.seats?.map(seat => `${seat.row}${seat.seatNumber}`).join(', ')}
                      </span>
                    </div>
                    
                    <div className="detail-item">
                      <strong>Total Amount:</strong>
                      <span className="amount">₹{booking.totalAmount}</span>
                    </div>
                    
                    <div className="detail-item">
                      <strong>Payment Status:</strong>
                      <span className={`payment-status ${booking.paymentStatus}`}>
                        {booking.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="booking-actions">
                    {booking.status === 'confirmed' && (
                      <>
                        {booking.qrCode && (
                          <button className="btn-secondary">
                            View Ticket
                          </button>
                        )}
                        <button 
                          className="btn-danger"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel Booking
                        </button>
                      </>
                    )}
                    
                    {booking.status === 'pending' && (
                      <button 
                        className="btn-danger"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;