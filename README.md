# Book My Film - Movie Ticket Booking Platform

A full-stack multi-language movie ticket booking platform built with React and Node.js.

## 🚀 Features

### Backend Features
- **User Authentication**: JWT-based registration and login
- **Movie Management**: Browse movies by language, genre, 3D support
- **Theater Management**: Theater listings with show times and seat layouts
- **Seat Selection**: Real-time seat booking with Socket.io
- **Multiple Payment Methods**: 
  - Credit/Debit Cards (Stripe integration)
  - UPI payments
  - Digital wallets (Paytm, PhonePe, etc.)
  - Net banking
- **Booking Management**: Create, confirm, and cancel bookings
- **Digital Tickets**: QR code generation for tickets
- **Multi-language Support**: English, Hindi, Tamil, Telugu, etc.

### Frontend Features
- **Responsive Design**: Mobile-first approach
- **Multi-language UI**: i18next integration
- **Real-time Updates**: Socket.io for live seat availability
- **Modern UI**: Styled components and Framer Motion animations
- **Context Management**: React Context for auth and language
- **Toast Notifications**: User-friendly feedback

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Socket.io** for real-time features
- **JWT** for authentication
- **Stripe** for payment processing
- **QRCode** for digital tickets
- **Bcrypt** for password hashing

### Frontend
- **React 18** with functional components
- **React Router** for navigation
- **Axios** for API calls
- **Socket.io Client** for real-time updates
- **React i18next** for internationalization
- **Styled Components** for styling
- **Framer Motion** for animations

## 📁 Project Structure

```
book-my-film/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main app component
│   └── package.json
├── models/                 # MongoDB models
│   ├── User.js
│   ├── Movie.js
│   ├── Theater.js
│   └── Booking.js
├── routes/                 # API routes
│   ├── auth.js             # Authentication routes
│   ├── movies.js           # Movie routes
│   ├── theaters.js         # Theater routes
│   ├── bookings.js         # Booking routes
│   └── payments.js         # Payment routes
├── middleware/             # Custom middleware
│   └── auth.js             # JWT authentication
├── server.js               # Express server
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-my-film
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bookmyfilm
   JWT_SECRET=your_jwt_secret_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   PORT=5000
   ```

5. **Start the application**
   
   **Development mode (both server and client):**
   ```bash
   # Terminal 1 - Start server
   npm run dev
   
   # Terminal 2 - Start client
   npm run client
   ```
   
   **Production mode:**
   ```bash
   npm run build
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Movies
- `GET /api/movies` - Get all movies with filters
- `GET /api/movies/:id` - Get movie by ID
- `GET /api/movies/language/:lang` - Get movies by language
- `GET /api/movies/genre/:genre` - Get movies by genre
- `GET /api/movies/3d/all` - Get 3D movies

### Theaters
- `GET /api/theaters` - Get all theaters
- `GET /api/theaters/:id` - Get theater by ID
- `GET /api/theaters/:theaterId/shows/:movieId` - Get shows
- `GET /api/theaters/:theaterId/shows/:showId/seats` - Get seat layout
- `POST /api/theaters` - Create theater (protected)
- `POST /api/theaters/:id/shows` - Add show (protected)

### Bookings
- `GET /api/bookings/my-bookings` - Get user bookings (protected)
- `GET /api/bookings/:id` - Get booking by ID (protected)
- `POST /api/bookings` - Create booking (protected)
- `PATCH /api/bookings/:id/confirm` - Confirm booking (protected)
- `PATCH /api/bookings/:id/cancel` - Cancel booking (protected)

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment
- `POST /api/payments/confirm-payment` - Confirm payment
- `POST /api/payments/upi-payment` - UPI payment
- `POST /api/payments/wallet-payment` - Wallet payment
- `POST /api/payments/netbanking-payment` - Net banking payment
- `GET /api/payments/history` - Payment history (protected)

## 🔧 Configuration

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in `.env` file
3. The application will create collections automatically

### Stripe Setup
1. Create a Stripe account
2. Get your secret key from Stripe dashboard
3. Update `STRIPE_SECRET_KEY` in `.env` file

### Email Setup (Optional)
1. Configure email credentials for notifications
2. Update `EMAIL_USER` and `EMAIL_PASS` in `.env` file

## 🧪 Testing

Run the API test script:
```bash
node test-api.js
```

This will test all major API endpoints and verify the application is working correctly.

## 🌐 Multi-language Support

The application supports multiple languages:
- English
- Hindi
- Tamil
- Telugu
- Malayalam
- Kannada

Language can be changed from the navbar dropdown.

## 🎯 Key Features Implemented

✅ **Complete Backend API** - All routes implemented and tested
✅ **User Authentication** - JWT-based secure authentication
✅ **Real-time Seat Selection** - Socket.io integration
✅ **Multiple Payment Methods** - Stripe, UPI, Wallet, Net Banking
✅ **Digital Tickets** - QR code generation
✅ **Booking Management** - Full CRUD operations
✅ **Multi-language Support** - Frontend and backend
✅ **Responsive Design** - Mobile-friendly interface
✅ **Error Handling** - Comprehensive error management
✅ **Security** - Password hashing, JWT tokens, input validation

## 🚀 Deployment

### Backend Deployment
1. Deploy to platforms like Heroku, Railway, or DigitalOcean
2. Set environment variables
3. Ensure MongoDB connection

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Netlify, Vercel, or serve from Express

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@bookmyfilm.com or create an issue in the repository.