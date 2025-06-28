import React from 'react';
import { Zap, MapPin, Phone, Mail, Instagram, Youtube, MessageCircle, Heart, Clock, Trophy } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Experience', href: '#experience' },
    { name: 'Events', href: '#events' },
    { name: 'Membership', href: '#membership' },
    { name: 'Gallery', href: '#gallery' }
  ];

  const services = [
    { name: 'Court Booking', href: '#' },
    { name: 'Coaching Programs', href: '#' },
    { name: 'Event Planning', href: '#' },
    { name: 'Corporate Packages', href: '#' },
    { name: 'Pro Shop', href: '#' }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-forest-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gold-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-cream-100 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-400/10 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="https://res.cloudinary.com/dfsrafhab/image/upload/v1750959110/picknik_logo_final_hofhlq.png"
                  alt="The PICKNIK Logo"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full bg-white shadow-md border border-gold-400 p-1 transition-all duration-300 hover:scale-105"
                  style={{ maxWidth: '64px', maxHeight: '64px' }}
                />
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="text-cream-200 font-inter text-sm">
                    Gomti Nagar, Lucknow, UP
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="text-cream-200 font-inter text-sm">
                    +91 9876543210
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="text-cream-200 font-inter text-sm">
                    hello@thepicknik.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="text-cream-200 font-inter text-sm">
                    6:00 AM - 11:00 PM Daily
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-playfair text-xl font-semibold mb-6 text-gold-400">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-cream-200 hover:text-gold-400 font-inter transition-colors duration-300 hover:translate-x-1 transform"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-playfair text-xl font-semibold mb-6 text-gold-400">
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-cream-200 hover:text-gold-400 font-inter transition-colors duration-300 hover:translate-x-1 transform block"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect & Updates */}
            <div>
              <h4 className="font-playfair text-xl font-semibold mb-6 text-gold-400">
                Stay Connected
              </h4>
              
              {/* Social Links */}
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="bg-forest-500 hover:bg-gold-400 text-cream-100 hover:text-forest-500 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <p className="text-cream-200 font-inter text-sm mb-4">
                  Get updates on events, exclusive offers, and community news.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 rounded-l-full bg-forest-500 border border-cream-100/20 text-cream-100 placeholder-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                  <button className="bg-gold-400 hover:bg-gold-500 text-forest-500 px-6 py-2 rounded-r-full font-semibold transition-colors">
                    Join
                  </button>
                </div>
              </div>

              {/* Awards/Recognition */}
              <div className="bg-forest-500/50 rounded-xl p-4 border border-cream-100/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="w-4 h-4 text-gold-400" />
                  <span className="text-gold-400 font-inter text-sm font-semibold">
                    Opening Soon
                  </span>
                </div>
                <p className="text-cream-200 font-inter text-xs">
                  Uttar Pradesh's largest luxury pickleball destination
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream-100/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Heart className="w-4 h-4 text-gold-400" />
                <span className="text-cream-200 font-inter text-sm">
                  Built with care for real-world joy
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-cream-200 font-inter text-sm">
                  © 2024 The PICKNIK. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="text-cream-200 hover:text-gold-400 font-inter text-sm transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-cream-200 hover:text-gold-400 font-inter text-sm transition-colors">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;