const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// Create payment intent for Stripe
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { amount, currency = 'inr', bookingId } = req.body;
    
    // Verify booking exists and belongs to user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        bookingId: bookingId,
        userId: req.user.id
      }
    });
    
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ message: 'Payment processing error' });
  }
});

// Confirm payment
router.post('/confirm-payment', auth, async (req, res) => {
  try {
    const { paymentIntentId, bookingId } = req.body;
    
    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not completed' });
    }
    
    // Update booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    booking.paymentStatus = 'completed';
    booking.status = 'confirmed';
    booking.transactionId = paymentIntentId;
    
    await booking.save();
    
    res.json({ 
      message: 'Payment confirmed successfully',
      booking 
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ message: 'Payment confirmation error' });
  }
});

// Handle UPI payment simulation
router.post('/upi-payment', auth, async (req, res) => {
  try {
    const { bookingId, upiId, amount } = req.body;
    
    // Verify booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Simulate UPI payment processing
    // In real implementation, integrate with UPI payment gateway
    const isPaymentSuccessful = Math.random() > 0.1; // 90% success rate for simulation
    
    if (isPaymentSuccessful) {
      const transactionId = 'UPI' + Date.now() + Math.random().toString(36).substr(2, 8).toUpperCase();
      
      booking.paymentStatus = 'completed';
      booking.status = 'confirmed';
      booking.transactionId = transactionId;
      booking.paymentMethod = 'upi';
      
      await booking.save();
      
      res.json({
        success: true,
        message: 'UPI payment successful',
        transactionId,
        booking
      });
    } else {
      booking.paymentStatus = 'failed';
      await booking.save();
      
      res.status(400).json({
        success: false,
        message: 'UPI payment failed. Please try again.'
      });
    }
  } catch (error) {
    console.error('Error processing UPI payment:', error);
    res.status(500).json({ message: 'UPI payment processing error' });
  }
});

// Handle wallet payment simulation
router.post('/wallet-payment', auth, async (req, res) => {
  try {
    const { bookingId, walletType, amount } = req.body;
    
    // Verify booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Simulate wallet payment processing
    // In real implementation, integrate with wallet APIs (Paytm, PhonePe, etc.)
    const isPaymentSuccessful = Math.random() > 0.05; // 95% success rate for simulation
    
    if (isPaymentSuccessful) {
      const transactionId = walletType.toUpperCase() + Date.now() + Math.random().toString(36).substr(2, 8).toUpperCase();
      
      booking.paymentStatus = 'completed';
      booking.status = 'confirmed';
      booking.transactionId = transactionId;
      booking.paymentMethod = 'wallet';
      
      await booking.save();
      
      res.json({
        success: true,
        message: `${walletType} payment successful`,
        transactionId,
        booking
      });
    } else {
      booking.paymentStatus = 'failed';
      await booking.save();
      
      res.status(400).json({
        success: false,
        message: `${walletType} payment failed. Please try again.`
      });
    }
  } catch (error) {
    console.error('Error processing wallet payment:', error);
    res.status(500).json({ message: 'Wallet payment processing error' });
  }
});

// Handle net banking payment simulation
router.post('/netbanking-payment', auth, async (req, res) => {
  try {
    const { bookingId, bankCode, amount } = req.body;
    
    // Verify booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Simulate net banking payment processing
    const isPaymentSuccessful = Math.random() > 0.08; // 92% success rate for simulation
    
    if (isPaymentSuccessful) {
      const transactionId = 'NB' + bankCode + Date.now() + Math.random().toString(36).substr(2, 6).toUpperCase();
      
      booking.paymentStatus = 'completed';
      booking.status = 'confirmed';
      booking.transactionId = transactionId;
      booking.paymentMethod = 'netbanking';
      
      await booking.save();
      
      res.json({
        success: true,
        message: 'Net banking payment successful',
        transactionId,
        booking
      });
    } else {
      booking.paymentStatus = 'failed';
      await booking.save();
      
      res.status(400).json({
        success: false,
        message: 'Net banking payment failed. Please try again.'
      });
    }
  } catch (error) {
    console.error('Error processing net banking payment:', error);
    res.status(500).json({ message: 'Net banking payment processing error' });
  }
});

// Get payment history for user
router.get('/history', auth, async (req, res) => {
  try {
    const payments = await Booking.find({ 
      user: req.user.id,
      paymentStatus: { $in: ['completed', 'failed', 'refunded'] }
    })
    .populate('movie', 'title poster')
    .populate('theater', 'name')
    .select('bookingId totalAmount paymentStatus paymentMethod transactionId createdAt movie theater')
    .sort({ createdAt: -1 });
    
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Refund payment
router.post('/refund', auth, async (req, res) => {
  try {
    const { bookingId, reason } = req.body;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    if (booking.paymentStatus !== 'completed') {
      return res.status(400).json({ message: 'No payment to refund' });
    }
    
    // Process refund based on payment method
    let refundId;
    
    if (booking.paymentMethod === 'card' && booking.transactionId.startsWith('pi_')) {
      // Stripe refund
      try {
        const refund = await stripe.refunds.create({
          payment_intent: booking.transactionId,
          reason: 'requested_by_customer'
        });
        refundId = refund.id;
      } catch (stripeError) {
        console.error('Stripe refund error:', stripeError);
        return res.status(500).json({ message: 'Refund processing failed' });
      }
    } else {
      // Simulate refund for other payment methods
      refundId = 'REF' + Date.now() + Math.random().toString(36).substr(2, 8).toUpperCase();
    }
    
    booking.paymentStatus = 'refunded';
    booking.status = 'cancelled';
    await booking.save();
    
    res.json({
      message: 'Refund processed successfully',
      refundId,
      booking
    });
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({ message: 'Refund processing error' });
  }
});

module.exports = router;