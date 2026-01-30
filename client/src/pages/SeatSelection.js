import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import './SeatSelection.css';

const SeatSelection = () => {
  const { theaterId, showId } = useParams();
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Initialize socket connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    
    newSocket.emit('join-show', showId);
    
    newSocket.on('seat-update', (data) => {
      setSeats(prevSeats => 
        prevSeats.map(seat => 
          seat.seatNumber === data.seatNumber ? 
          { ...seat, isAvailable: !data.isSelected } : seat
        )
      );
    });

    fetchShowDetails();

    return () => {
      newSocket.disconnect();
    };
  }, [showId, user, navigate]);

  const fetchShowDetails = async () => {
    try {
      // Mock data for demonstration
      const mockShow = {
        movie: {
          title: { english: 'Sample Movie' },
          poster: '/api/placeholder/300/400'
        },
        theater: {
          name: 'Sample Theater',
          screen: 'Screen 1'
        },
        showTime: new Date(),
        basePrice: 150,
        couplesSeatPrice: 300
      };

      const mockSeats = generateSeats();
      
      setShowDetails(mockShow);
      setSeats(mockSeats);
    } catch (error) {
      toast.error('Failed to load show details');
    } finally {
      setLoading(false);
    }
  };

  const generateSeats = () => {
    const seatTypes = ['common', 'friends', 'family', 'couples'];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 12;
    const seats = [];

    rows.forEach((row, rowIndex) => {
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        let type = 'common';
        let price = 150;
        
        // Assign seat types based on position
        if (rowIndex >= 7) { // Back rows for couples
          if (seatNum >= 4 && seatNum <= 9) {
            type = 'couples';
            price = 300;
          }
        } else if (rowIndex >= 4) { // Middle rows for family/friends
          type = Math.random() > 0.5 ? 'family' : 'friends';
        }

        seats.push({
          seatNumber: `${row}${seatNum}`,
          row,
          number: seatNum,
          type,
          price,
          isAvailable: Math.random() > 0.3, // 70% availability
          isSelected: false
        });
      }
    });

    return seats;
  };

  const handleSeatClick = (seat) => {
    if (!seat.isAvailable) return;

    const isSelected = selectedSeats.find(s => s.seatNumber === seat.seatNumber);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.seatNumber !== seat.seatNumber));
    } else {
      if (selectedSeats.length >= 10) {
        toast.error('Maximum 10 seats can be selected');
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }

    // Emit seat selection to other users
    if (socket) {
      socket.emit('seat-selected', {
        showId,
        seatNumber: seat.seatNumber,
        isSelected: !isSelected
      });
    }
  };

  const getSeatClass = (seat) => {
    const isSelected = selectedSeats.find(s => s.seatNumber === seat.seatNumber);
    
    if (!seat.isAvailable) return `seat seat-${seat.type} seat-booked`;
    if (isSelected) return `seat seat-${seat.type} seat-selected`;
    return `seat seat-${seat.type} seat-available`;
  };

  const getTotalAmount = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const proceedToPayment = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }

    const bookingData = {
      theaterId,
      showId,
      selectedSeats,
      totalAmount: getTotalAmount(),
      showDetails
    };

    navigate('/payment', { state: bookingData });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  return (
    <div className="seat-selection">
      <div className="container">
        {/* Movie Info Header */}
        <div className="movie-header">
          <div className="movie-info">
            <h1>{showDetails?.movie?.title?.english}</h1>
            <p>{showDetails?.theater?.name} - {showDetails?.theater?.screen}</p>
            <p>{new Date(showDetails?.showTime).toLocaleString()}</p>
          </div>
        </div>

        {/* Screen */}
        <div className="screen-container">
          <div className="screen">
            <span>SCREEN</span>
          </div>
        </div>

        {/* Seat Map */}
        <div className="seat-map">
          {Object.entries(groupedSeats).map(([row, rowSeats]) => (
            <div key={row} className="seat-row">
              <div className="row-label">{row}</div>
              <div className="seats">
                {rowSeats.map((seat) => (
                  <button
                    key={seat.seatNumber}
                    className={getSeatClass(seat)}
                    onClick={() => handleSeatClick(seat)}
                    disabled={!seat.isAvailable}
                    title={`${seat.seatNumber} - ${seat.type} - ₹${seat.price}`}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="seat-legend">
          <div className="legend-item">
            <div className="seat seat-common seat-available"></div>
            <span>{t('common')} - ₹150</span>
          </div>
          <div className="legend-item">
            <div className="seat seat-friends seat-available"></div>
            <span>{t('friends')} - ₹150</span>
          </div>
          <div className="legend-item">
            <div className="seat seat-family seat-available"></div>
            <span>{t('family')} - ₹150</span>
          </div>
          <div className="legend-item">
            <div className="seat seat-couples seat-available"></div>
            <span>{t('couples')} - ₹300</span>
          </div>
          <div className="legend-item">
            <div className="seat seat-common seat-selected"></div>
            <span>{t('selected')}</span>
          </div>
          <div className="legend-item">
            <div className="seat seat-common seat-booked"></div>
            <span>{t('booked')}</span>
          </div>
        </div>

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div className="selected-summary">
            <div className="summary-content">
              <div className="selected-seats">
                <h3>Selected Seats ({selectedSeats.length})</h3>
                <div className="selected-list">
                  {selectedSeats.map(seat => (
                    <span key={seat.seatNumber} className={`selected-seat seat-${seat.type}`}>
                      {seat.seatNumber}
                    </span>
                  ))}
                </div>
              </div>
              <div className="total-amount">
                <h3>Total: ₹{getTotalAmount()}</h3>
              </div>
              <button 
                className="btn btn-primary proceed-btn"
                onClick={proceedToPayment}
              >
                {t('proceedToPayment')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatSelection;