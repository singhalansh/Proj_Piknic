import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/#${id}`;
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-forest-500/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gold-400 p-2 rounded-full">
                <Zap className="w-5 h-5 text-forest-500" />
              </div>
              <div>
                <h1 className="font-playfair text-xl md:text-2xl font-semibold text-cream-50">
                  The PICKNIK
                </h1>
                <p className="text-xs text-cream-100 tracking-wider hidden sm:block">
                  A PLACE BEYOND TIME
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className="text-cream-100 hover:text-gold-400 transition-colors font-inter font-medium tracking-wide"
            >
              Home
            </Link>
            <Link 
              to="/our-story"
              className="text-cream-100 hover:text-gold-400 transition-colors font-inter font-medium tracking-wide"
            >
              Our Story
            </Link>
            <Link 
              to="/our-tales"
              className="text-cream-100 hover:text-gold-400 transition-colors font-inter font-medium tracking-wide"
            >
              Our Tales
            </Link>
            <Link 
              to="/our-courts"
              className="text-cream-100 hover:text-gold-400 transition-colors font-inter font-medium tracking-wide"
            >
              Our Courts
            </Link>
            <Link 
              to="/cafe"
              className="text-cream-100 hover:text-gold-400 transition-colors font-inter font-medium tracking-wide"
            >
              The Café
            </Link>
            <button 
              onClick={() => scrollToSection('events')}
              className="text-cream-100 hover:text-gold-400 transition-colors font-inter font-medium tracking-wide"
            >
              Events
            </button>
            <button 
              onClick={() => scrollToSection('membership')}
              className="text-cream-100 hover:text-gold-400 transition-colors font-inter font-medium tracking-wide"
            >
              Membership
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gold-400 hover:bg-gold-500 text-forest-500 px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
            >
              Visit Us
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cream-50 hover:text-gold-400 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-forest-500/95 backdrop-blur-md">
          <div className="px-4 py-6 space-y-4">
            <Link 
              to="/"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-cream-100 hover:text-gold-400 transition-colors font-inter py-2"
            >
              Home
            </Link>
            <Link 
              to="/our-story"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-cream-100 hover:text-gold-400 transition-colors font-inter py-2"
            >
              Our Story
            </Link>
            <Link 
              to="/our-tales"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-cream-100 hover:text-gold-400 transition-colors font-inter py-2"
            >
              Our Tales
            </Link>
            <Link 
              to="/our-courts"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-cream-100 hover:text-gold-400 transition-colors font-inter py-2"
            >
              Our Courts
            </Link>
            <Link 
              to="/cafe"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-cream-100 hover:text-gold-400 transition-colors font-inter py-2"
            >
              The Café
            </Link>
            <button 
              onClick={() => scrollToSection('events')}
              className="block w-full text-left text-cream-100 hover:text-gold-400 transition-colors font-inter py-2"
            >
              Events
            </button>
            <button 
              onClick={() => scrollToSection('membership')}
              className="block w-full text-left text-cream-100 hover:text-gold-400 transition-colors font-inter py-2"
            >
              Membership
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gold-400 hover:bg-gold-500 text-forest-500 px-6 py-3 rounded-full font-medium transition-all duration-300 w-full mt-4"
            >
              Visit Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;