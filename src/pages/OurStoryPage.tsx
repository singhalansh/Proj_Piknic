import React, { useEffect, useRef, useState } from 'react';
import { Play, ChevronDown, Quote } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OurStoryPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  // const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const chapters = [
    {
      title: "The Time We Lost",
      subtitle: "When did we stop looking up?",
      content: "There was a time when joy wasn't something you captured... but lived. When laughter echoed through neighborhoods, not just through speakers. When the sweetest victories were shared with muddy shoes and genuine smiles.",
      image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1920",
      quote: "We traded sunshine for screens, play for performance, presence for productivity."
    },
    {
      title: "The Escape We Found",
      subtitle: "A sanctuary in the storm",
      content: "In the heart of Gomti Nagar, we discovered something profound: that the most precious moments happen when we step away from the digital rush and step into spaces designed for genuine human connection.",
      image: "https://images.pexels.com/photos/8611100/pexels-photo-8611100.jpeg?auto=compress&cs=tinysrgb&w=1920",
      quote: "Here, time moves differently. Here, connections are made with hearts, not just handles."
    },
    {
      title: "The Experience We Created",
      subtitle: "Where memories are made, not just captured",
      content: "The PICKNIK was born from a simple belief: that sport and soul can dance together, that luxury and leisure can embrace, that every moment spent here becomes part of your own beautiful narrative.",
      image: "https://images.pexels.com/photos/8611353/pexels-photo-8611353.jpeg?auto=compress&cs=tinysrgb&w=1920",
      quote: "Welcome to a place where every serve brings people together, every rally creates memories."
    }
  ];

  const scrollToNext = () => {
    const nextSection = document.getElementById('chapter-0');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-forest-600 via-forest-500 to-forest-700">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="w-full h-full bg-[url('https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-40"></div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-gold-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-cream-100 rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-gold-300 rounded-full animate-float opacity-50" style={{ animationDelay: '4s' }}></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className={`transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream-50 mb-8 leading-tight">
              Some places aren't built—
            </h1>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-light text-gold-400 mb-12">
              they're remembered.
            </h2>
            
            <div className="max-w-3xl mx-auto mb-16">
              <p className="text-cream-200 text-xl font-inter leading-relaxed opacity-90">
                This is the story of The PICKNIK. Not just how we came to be, 
                but why we needed to exist in a world that had forgotten how to pause.
              </p>
            </div>

            {/* Audio Player */}
            <div className="flex items-center justify-center gap-6 mb-16">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-3 bg-gold-400/20 backdrop-blur-sm border border-gold-400/30 rounded-full px-8 py-4 text-cream-100 hover:bg-gold-400/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full border-2 border-gold-400 flex items-center justify-center">
                  <Play className="w-5 h-5 ml-1 text-gold-400" />
                </div>
                <span className="font-inter font-medium">Listen to Our Story</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToNext}
            className="text-cream-100 hover:text-gold-400 transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* Story Chapters */}
      <div ref={sectionRef} className="relative">
        {chapters.map((chapter, index) => (
          <section 
            key={index}
            id={`chapter-${index}`}
            className="min-h-screen flex items-center py-20 relative overflow-hidden"
            style={{
              background: index % 2 === 0 
                ? 'linear-gradient(135deg, #FAF7F2 0%, #f7f0e8 100%)' 
                : 'linear-gradient(135deg, #1B4D3E 0%, #167a3a 100%)'
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-20 left-20 w-64 h-64 border border-gold-400 rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-48 h-48 border border-cream-100 rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Text Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`
                }`}>
                  <div className={`${index % 2 === 0 ? 'text-forest-500' : 'text-cream-50'}`}>
                    <h3 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
                      {chapter.title}
                    </h3>
                    <p className={`font-playfair text-2xl mb-8 italic ${
                      index % 2 === 0 ? 'text-forest-600' : 'text-gold-400'
                    }`}>
                      {chapter.subtitle}
                    </p>
                    
                    <div className={`w-24 h-1 ${index % 2 === 0 ? 'bg-gold-400' : 'bg-cream-100'} rounded-full mb-8`}></div>
                    
                    <p className={`font-inter text-xl leading-relaxed mb-12 ${
                      index % 2 === 0 ? 'text-forest-700' : 'text-cream-100'
                    }`}>
                      {chapter.content}
                    </p>

                    {/* Quote */}
                    <div className={`relative p-8 rounded-2xl ${
                      index % 2 === 0 
                        ? 'bg-forest-500/10 border border-forest-200' 
                        : 'bg-cream-50/10 border border-cream-100/20'
                    }`}>
                      <Quote className={`w-8 h-8 ${
                        index % 2 === 0 ? 'text-gold-400' : 'text-gold-400'
                      } mb-4`} />
                      <blockquote className={`font-playfair text-2xl italic leading-relaxed ${
                        index % 2 === 0 ? 'text-forest-600' : 'text-cream-100'
                      }`}>
                        {chapter.quote}
                      </blockquote>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} transition-all duration-1000 delay-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${index % 2 === 0 ? 'translate-x-10' : '-translate-x-10'}`
                }`}>
                  <div className="relative">
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={chapter.image}
                        alt={chapter.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className={`absolute -top-6 -right-6 w-32 h-32 ${
                      index % 2 === 0 ? 'bg-gold-400' : 'bg-cream-100'
                    } rounded-full opacity-20`}></div>
                    <div className={`absolute -bottom-8 -left-8 w-24 h-24 border-4 ${
                      index % 2 === 0 ? 'border-forest-500' : 'border-gold-400'
                    } rounded-full opacity-30`}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gold-400 to-gold-500 text-forest-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8611100/pexels-photo-8611100.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Your Story Begins Here
          </h3>
          <p className="font-inter text-xl md:text-2xl opacity-90 mb-12 leading-relaxed">
            Every visit to The PICKNIK becomes a chapter in your own story. 
            A story of connection, joy, and moments that matter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-forest-500 hover:bg-forest-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl">
              Begin Your Journey
            </button>
            <button className="flex items-center space-x-2 text-forest-500 hover:text-forest-600 font-semibold">
              <span>Explore Our Courts</span>
              <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStoryPage;