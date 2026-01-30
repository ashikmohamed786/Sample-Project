import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const mockBookingData = {
    bookingId: bookingId || 'BMF2026013012345',
    movieTitle: 'Avengers: Endgame',
    theaterName: 'PVR Cinemas - Forum Mall',
    showTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleString(),
    seats: ['F5', 'F6'],
    totalAmount: 400,
    paymentMethod: 'Credit Card',
    transactionId: 'TXN123456789'
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon">
          <div className="checkmark">✓</div>
        </div>
        
        <h1>Booking Confirmed!</h1>
        <p className="success-message">
          Your movie tickets have been booked successfully
        </p>

        <div className="ticket-details">
          <div className="ticket-header">
            <h2>🎬 Digital Ticket</h2>
            <span className="booking-id">#{mockBookingData.bookingId}</span>
          </div>

          <div className="ticket-info">
            <div className="info-row">
              <span className="label">Movie:</span>
              <span className="value">{mockBookingData.movieTitle}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Theater:</span>
              <span className="value">{mockBookingData.theaterName}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Show Time:</span>
              <span className="value">{mockBookingData.showTime}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Seats:</span>
              <span className="value">{mockBookingData.seats.join(', ')}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Total Paid:</span>
              <span className="value amount">₹{mockBookingData.totalAmount}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Payment Method:</span>
              <span className="value">{mockBookingData.paymentMethod}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Transaction ID:</span>
              <span className="value">{mockBookingData.transactionId}</span>
            </div>
          </div>

          <div className="qr-section">
            <div className="qr-placeholder">
              <div className="qr-code">
                <div className="qr-pattern"></div>
              </div>
              <p>Show this QR code at the theater</p>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="btn-primary"
            onClick={() => navigate('/profile')}
          >
            View My Bookings
          </button>
          
          <button 
            className="btn-secondary"
            onClick={() => navigate('/')}
          >
            Book More Tickets
          </button>
        </div>

        <div className="important-notes">
          <h3>Important Notes:</h3>
          <ul>
            <li>Please arrive at the theater 15 minutes before show time</li>
            <li>Carry a valid ID proof along with this ticket</li>
            <li>Outside food and beverages are not allowed</li>
            <li>Tickets once booked cannot be exchanged or refunded</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;