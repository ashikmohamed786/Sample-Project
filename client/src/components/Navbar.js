import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const languages = {
    english: 'English',
    tamil: 'தமிழ்',
    hindi: 'हिंदी',
    telugu: 'తెలుగు',
    spanish: 'Español',
    japanese: '日本語',
    chinese: '中文'
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-text">Book My Film</span>
          </Link>
          
          <div className="navbar-menu">
            <Link to="/" className="nav-link">{t('home')}</Link>
            <Link to="/movies" className="nav-link">{t('movies')}</Link>
            
            <div className="language-selector">
              <button 
                className="language-btn"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                {languages[currentLanguage]} ▼
              </button>
              {showLanguageDropdown && (
                <div className="language-dropdown">
                  {Object.entries(languages).map(([code, name]) => (
                    <button
                      key={code}
                      className={`language-option ${currentLanguage === code ? 'active' : ''}`}
                      onClick={() => {
                        changeLanguage(code);
                        setShowLanguageDropdown(false);
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {user ? (
              <div className="user-menu">
                <Link to="/profile" className="nav-link">{user.name}</Link>
                <button onClick={handleLogout} className="btn btn-secondary">
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-primary">{t('login')}</Link>
                <Link to="/register" className="btn btn-secondary">{t('register')}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;