import React, { useEffect, useRef, useState } from 'react';
import { Heart, Clock, Users } from 'lucide-react';

const OurStory: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" ref={sectionRef} className="py-20 bg-cream-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-forest-300 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-gold-300 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-forest-500 mb-6">
            Our Story
          </h2>
          <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="prose prose-lg max-w-none">
              <p className="font-playfair text-xl md:text-2xl text-forest-600 leading-relaxed mb-6 italic">
                "There was a time when joy wasn't something you captured... but lived."
              </p>
              
              <p className="text-forest-700 font-inter text-lg leading-relaxed mb-6">
                In a world that moves at the speed of notifications, we dreamed of creating 
                a sanctuary where time slows down, where laughter echoes louder than alerts, 
                and where connections are made with hearts, not just handles.
              </p>
              
              <p className="text-forest-700 font-inter text-lg leading-relaxed mb-8">
                The PICKNIK was born from a simple belief: that the most precious moments 
                happen when we step away from the digital rush and step into spaces designed 
                for genuine human connection, spirited play, and soulful leisure.
              </p>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-8 h-8 text-forest-500" />
                  </div>
                  <p className="font-inter text-sm text-forest-600 font-medium">
                    Built with Love
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-forest-500" />
                  </div>
                  <p className="font-inter text-sm text-forest-600 font-medium">
                    Timeless Moments
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-forest-500" />
                  </div>
                  <p className="font-inter text-sm text-forest-600 font-medium">
                    Real Connections
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative">
              <div className="bg-forest-500 rounded-2xl p-8 shadow-2xl">
                <div className="bg-cream-50 rounded-xl p-6">
                  <blockquote className="font-playfair text-xl text-forest-600 italic leading-relaxed">
                    "We didn't just want to build courts; we wanted to build a community. 
                    A place where every serve brings people together, every rally creates memories, 
                    and every visit feels like coming home."
                  </blockquote>
                  <footer className="mt-4">
                    <p className="font-inter text-forest-500 font-semibold">— The PICKNIK Founders</p>
                  </footer>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-4 border-gold-400 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-forest-500 to-forest-600 rounded-2xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8611100/pexels-photo-8611100.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10">
              <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Welcome to a place where memories are made, not just captured.
              </h3>
              <p className="font-inter text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
                Every corner of The PICKNIK tells a story of craftsmanship, every detail speaks 
                of care, and every moment spent here becomes part of your own beautiful narrative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;