import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  english: {
    home: 'Home',
    movies: 'Movies',
    profile: 'Profile',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    bookTickets: 'Book Tickets',
    selectSeats: 'Select Seats',
    payment: 'Payment',
    bookingConfirmed: 'Booking Confirmed',
    languages: 'Languages',
    genres: 'Genres',
    nowShowing: 'Now Showing',
    comingSoon: 'Coming Soon',
    experience3D: '3D Experience',
    watchPreview: 'Watch Preview',
    selectShow: 'Select Show',
    common: 'Common',
    friends: 'Friends',
    family: 'Family',
    couples: 'Couples',
    available: 'Available',
    selected: 'Selected',
    booked: 'Booked',
    proceedToPayment: 'Proceed to Payment',
    paymentMethods: 'Payment Methods',
    card: 'Card',
    upi: 'UPI',
    wallet: 'Wallet',
    netbanking: 'Net Banking'
  },
  tamil: {
    home: 'முகப்பு',
    movies: 'திரைப்படங்கள்',
    profile: 'சுயவிவரம்',
    login: 'உள்நுழைய',
    register: 'பதிவு செய்ய',
    logout: 'வெளியேறு',
    bookTickets: 'டிக்கெட் முன்பதிவு',
    selectSeats: 'இருக்கை தேர்வு',
    payment: 'பணம் செலுத்துதல்',
    bookingConfirmed: 'முன்பதிவு உறுதி',
    languages: 'மொழிகள்',
    genres: 'வகைகள்',
    nowShowing: 'இப்போது காண்பிக்கப்படுகிறது',
    comingSoon: 'விரைவில் வரும்',
    experience3D: '3D அனுபவம்',
    watchPreview: 'முன்னோட்டம் பார்க்க',
    selectShow: 'நிகழ்ச்சி தேர்வு',
    common: 'பொதுவான',
    friends: 'நண்பர்கள்',
    family: 'குடும்பம்',
    couples: 'ஜோடிகள்',
    available: 'கிடைக்கும்',
    selected: 'தேர்ந்தெடுக்கப்பட்டது',
    booked: 'முன்பதிவு செய்யப்பட்டது',
    proceedToPayment: 'பணம் செலுத்துதலுக்கு செல்லுங்கள்',
    paymentMethods: 'பணம் செலுத்தும் முறைகள்',
    card: 'அட்டை',
    upi: 'UPI',
    wallet: 'பணப்பை',
    netbanking: 'நெட் பேங்கிங்'
  },
  hindi: {
    home: 'होम',
    movies: 'फिल्में',
    profile: 'प्रोफाइल',
    login: 'लॉगिन',
    register: 'रजिस्टर',
    logout: 'लॉगआउट',
    bookTickets: 'टिकट बुक करें',
    selectSeats: 'सीट चुनें',
    payment: 'भुगतान',
    bookingConfirmed: 'बुकिंग कन्फर्म',
    languages: 'भाषाएं',
    genres: 'शैलियां',
    nowShowing: 'अब दिखाई जा रही है',
    comingSoon: 'जल्द आ रही है',
    experience3D: '3D अनुभव',
    watchPreview: 'प्रीव्यू देखें',
    selectShow: 'शो चुनें',
    common: 'सामान्य',
    friends: 'दोस्त',
    family: 'परिवार',
    couples: 'जोड़े',
    available: 'उपलब्ध',
    selected: 'चयनित',
    booked: 'बुक किया गया',
    proceedToPayment: 'भुगतान के लिए आगे बढ़ें',
    paymentMethods: 'भुगतान के तरीके',
    card: 'कार्ड',
    upi: 'UPI',
    wallet: 'वॉलेट',
    netbanking: 'नेट बैंकिंग'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('english');

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.english[key] || key;
  };

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};