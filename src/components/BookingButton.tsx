import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle, Phone, Clock, ArrowRight } from 'lucide-react';

const BookingButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const bookingOptions = [
    {
      icon: Calendar,
      label: 'Book Court',
      description: 'Reserve your court time',
      action: () => console.log('Book court'),
      primary: true
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      description: 'Quick booking & queries',
      action: () => console.log('WhatsApp'),
      primary: false
    },
    {
      icon: Phone,
      label: 'Call Us',
      description: 'Speak to our team',
      action: () => console.log('Call'),
      primary: false
    }
  ];

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`}>
      <div className="relative">
        {/* Expanded Options */}
        {isExpanded && (
          <div className="absolute bottom-20 right-0 space-y-3 animate-fade-in-up">
            {bookingOptions.slice(1).map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div
                  key={index}
                  className="flex items-center bg-white shadow-xl rounded-full pl-6 pr-4 py-3 min-w-48 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  onClick={option.action}
                >
                  <div className="flex-1">
                    <p className="font-inter font-semibold text-forest-500 text-sm">
                      {option.label}
                    </p>
                    <p className="font-inter text-forest-400 text-xs">
                      {option.description}
                    </p>
                  </div>
                  <div className="bg-forest-500 group-hover:bg-gold-400 w-10 h-10 rounded-full flex items-center justify-center ml-3 transition-colors duration-300">
                    <IconComponent className="w-5 h-5 text-white group-hover:text-forest-500" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Main Button */}
        <div className="relative">
          {/* Pulse Animation Ring */}
          <div className="absolute -inset-1 bg-gold-400 rounded-full animate-ping opacity-30"></div>
          
          {/* Primary Button */}
          <button
            className={`relative bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-forest-500 shadow-2xl rounded-full transition-all duration-300 hover:scale-110 group ${
              isExpanded ? 'w-64 px-6 py-4' : 'w-16 h-16'
            }`}
            onClick={() => {
              if (isExpanded) {
                bookingOptions[0].action();
              } else {
                setIsExpanded(!isExpanded);
              }
            }}
            onMouseLeave={() => {
              setTimeout(() => setIsExpanded(false), 2000);
            }}
          >
            <div className="flex items-center justify-center">
              {isExpanded ? (
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5" />
                  <span className="font-inter font-semibold">Book Your Court</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              ) : (
                <Calendar className="w-6 h-6" />
              )}
            </div>
          </button>

          {/* Badge */}
          {!isExpanded && (
            <div className="absolute -top-2 -right-2 bg-forest-500 text-white text-xs font-semibold px-2 py-1 rounded-full animate-bounce">
              Book
            </div>
          )}
        </div>

        {/* Secondary Toggle Button */}
        {!isExpanded && (
          <button
            className="absolute -top-2 -left-2 bg-forest-500 hover:bg-forest-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            onClick={() => setIsExpanded(true)}
          >
            <Clock className="w-4 h-4" />
          </button>
        )}

        {/* Quick Stats Tooltip */}
        {isExpanded && (
          <div className="absolute -top-16 right-0 bg-forest-500 text-white px-4 py-2 rounded-lg text-sm font-inter whitespace-nowrap">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
              <span>4 courts available now</span>
            </div>
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-forest-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingButton;