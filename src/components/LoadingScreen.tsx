import React from 'react';
import { Zap } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-forest-500 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gold-400 p-4 rounded-full animate-float">
            <Zap className="w-8 h-8 text-forest-500" />
          </div>
        </div>
        <h1 className="font-playfair text-3xl md:text-4xl text-cream-50 mb-2 tracking-wider">
          The PICKNIK
        </h1>
        <p className="text-cream-100 font-inter text-sm tracking-widest opacity-80">
          A PLACE BEYOND TIME
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-32 h-1 bg-gold-400 rounded-full overflow-hidden">
            <div className="w-full h-full bg-cream-50 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;