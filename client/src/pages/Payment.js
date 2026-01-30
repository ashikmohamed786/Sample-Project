import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import './Payment.css';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const bookingData = location.state;

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success('Payment successful! Booking confirmed.');
      navigate('/booking-confirmation/demo123');
      setLoading(false);
    }, 2000);
  };

  if (!bookingData) {
    return (
      <div className="payment-container">
        <div className="error-message">
          <h2>No booking data found</h2>
          <p>Please select seats first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1>Complete Your Payment</h1>
        
        <div className="booking-summary">
          <h3>Booking Summary</h3>
          <div className="summary-item">
            <span>Movie:</span>
            <span>{bookingData.movieTitle}</span>
          </div>
          <div className="summary-item">
            <span>Theater:</span>
            <span>{bookingData.theaterName}</span>
          </div>
          <div className="summary-item">
            <span>Show Time:</span>
            <span>{bookingData.showTime}</span>
          </div>
          <div className="summary-item">
            <span>Seats:</span>
            <span>{bookingData.selectedSeats?.join(', ')}</span>
          </div>
          <div className="summary-item total">
            <span>Total Amount:</span>
            <span>₹{bookingData.totalAmount}</span>
          </div>
        </div>

        <div className="payment-methods">
          <h3>Select Payment Method</h3>
          
          <div className="payment-options">
            <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div className="option-content">
                <span className="option-icon">💳</span>
                <span>Credit/Debit Card</span>
              </div>
            </label>

            <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div className="option-content">
                <span className="option-icon">📱</span>
                <span>UPI Payment</span>
              </div>
            </label>

            <label className={`payment-option ${paymentMethod === 'wallet' ? 'selected' : ''}`}>
              <input
                type="radio"
                value="wallet"
                checked={paymentMethod === 'wallet'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div className="option-content">
                <span className="option-icon">👛</span>
                <span>Digital Wallet</span>
              </div>
            </label>

            <label className={`payment-option ${paymentMethod === 'netbanking' ? 'selected' : ''}`}>
              <input
                type="radio"
                value="netbanking"
                checked={paymentMethod === 'netbanking'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div className="option-content">
                <span className="option-icon">🏦</span>
                <span>Net Banking</span>
              </div>
            </label>
          </div>
        </div>

        <button 
          className="pay-button"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay ₹${bookingData.totalAmount}`}
        </button>
      </div>
    </div>
  );
};

export default Payment;