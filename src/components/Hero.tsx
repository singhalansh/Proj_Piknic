import React, { useEffect, useState } from 'react';
import { ChevronDown, Play } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToStory = () => {
    const element = document.getElementById('story');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-forest-600 via-forest-500 to-forest-700">
          <div className="absolute inset-0 bg-black/40"></div>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-70"
          >
            <source src="https://res.cloudinary.com/dfsrafhab/video/upload/v1750010885/qcyxwkcehopyukhqjxyy.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-gold-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-cream-100 rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-gold-300 rounded-full animate-float opacity-50" style={{ animationDelay: '4s' }}></div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream-50 mb-6 leading-tight">
          The <span className="text-gold-400">PICKNIK</span>
        </h1>
        
        <p className="font-playfair text-xl sm:text-2xl lg:text-3xl text-cream-100 mb-8 font-light tracking-wider">
          A Place Beyond Time
        </p>
        
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-cream-200 text-lg font-inter leading-relaxed opacity-90">
            In the heart of Gomti Nagar, where luxury meets leisure and sport meets soul, 
            discover Uttar Pradesh's most exclusive pickleball destination.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <button 
            onClick={scrollToStory}
            className="bg-gold-400 hover:bg-gold-500 text-forest-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 font-inter"
          >
            Step Into the Experience
          </button>
          
          <button className="flex items-center space-x-3 text-cream-100 hover:text-gold-400 transition-colors group">
            <div className="w-12 h-12 rounded-full border-2 border-cream-100 group-hover:border-gold-400 flex items-center justify-center transition-colors">
              <Play className="w-5 h-5 ml-1" />
            </div>
            <span className="font-inter font-medium">Watch Our Story</span>
          </button>
        </div>

        {/* Location Badge */}
        <div className="inline-flex items-center bg-forest-400/30 backdrop-blur-sm border border-cream-100/20 rounded-full px-6 py-3">
          <div className="w-2 h-2 bg-gold-400 rounded-full mr-3 animate-pulse"></div>
          <span className="text-cream-100 font-inter text-sm">
            Gomti Nagar, Lucknow • Opening Soon
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToStory}
          className="text-cream-100 hover:text-gold-400 transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;