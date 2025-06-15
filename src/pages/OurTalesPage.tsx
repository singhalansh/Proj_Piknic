import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronDown, Sparkles, Heart, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
  image: string;
  mood: 'dark' | 'sepia' | 'warm' | 'bright' | 'golden' | 'magical';
  overlay: string;
  particles: string;
  icon: React.ElementType;
}

const OurTalesPage: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<(HTMLDivElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    try {
      audioRef.current = new Audio('/assets/converted-audio.wav');
      audioRef.current.loop = true;
      
      // Add error handling for audio loading
      audioRef.current.addEventListener('error', (e) => {
        console.error('Error loading audio:', e);
        console.error('Audio error code:', audioRef.current?.error?.code);
        console.error('Audio error message:', audioRef.current?.error?.message);
      });

      // Add audio loading event listener
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('Audio loaded successfully');
      });

      // Add more detailed event listeners
      audioRef.current.addEventListener('loadstart', () => {
        console.log('Audio loading started');
      });

      audioRef.current.addEventListener('loadeddata', () => {
        console.log('Audio data loaded');
      });

      audioRef.current.addEventListener('playing', () => {
        console.log('Audio started playing');
      });

      audioRef.current.addEventListener('pause', () => {
        console.log('Audio paused');
      });

      // Preload the audio
      audioRef.current.load();
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }, []);

  // Handle audio playback with enhanced error handling
  useEffect(() => {
    if (!audioRef.current) return;

    const playAudio = async () => {
      try {
        if (isPlaying && isAudioEnabled) {
          console.log('Attempting to play audio...');
          await audioRef.current?.play();
          console.log('Audio playback started successfully');
        } else {
          console.log('Pausing audio...');
          audioRef.current?.pause();
          console.log('Audio playback paused');
        }
      } catch (error) {
        console.error('Error playing audio:', error);
        // Reset states if playback fails
        setIsPlaying(false);
        setIsAudioEnabled(false);
      }
    };

    playAudio();
  }, [isPlaying, isAudioEnabled]);

  // Handle audio volume with enhanced error handling
  useEffect(() => {
    if (!audioRef.current) return;

    try {
      audioRef.current.volume = isAudioEnabled ? 1 : 0;
      console.log('Audio volume set to:', isAudioEnabled ? 1 : 0);
    } catch (error) {
      console.error('Error setting audio volume:', error);
    }
  }, [isAudioEnabled]);

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced scroll tracking with progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      setScrollProgress(progress);
      
      chaptersRef.current.forEach((chapter, index) => {
        if (!chapter) return;
        
        const rect = chapter.getBoundingClientRect();
        const chapterTop = rect.top + scrollTop;
        const chapterHeight = rect.height;
        
        if (scrollTop >= chapterTop - windowHeight / 2 && 
            scrollTop < chapterTop + chapterHeight - windowHeight / 2) {
          setCurrentChapter(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chapters: Chapter[] = [
    {
      id: 'forgotten',
      title: 'The Life We Forgot',
      subtitle: 'When screens became our windows',
      content: [
        "We once played.",
        "We once laughed until our bellies hurt.",
        "Now, we scroll… endlessly.",
        "And in chasing time, we lost it."
      ],
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=1920',
      mood: 'dark',
      overlay: 'from-black/80 via-gray-900/60 to-black/40',
      particles: 'digital',
      icon: Clock
    },
    {
      id: 'ache',
      title: 'The Ache in Us All',
      subtitle: 'Memories of simpler times',
      content: [
        "We remembered how it felt...",
        "to chase sunsets barefoot.",
        "To laugh without filters.",
        "To be together, not just connected."
      ],
      image: '',
      mood: 'sepia',
      overlay: 'from-amber-900/70 via-orange-800/50 to-yellow-900/30',
      particles: 'nostalgic',
      icon: Heart
    },
    {
      id: 'discovery',
      title: 'The Discovery',
      subtitle: 'A sanctuary emerges',
      content: [
        "Then we found it.",
        "A place beyond time.",
        "Where play isn't a performance —",
        "it's permission to feel."
      ],
      image: 'https://images.pexels.com/photos/8611100/pexels-photo-8611100.jpeg?auto=compress&cs=tinysrgb&w=1920',
      mood: 'warm',
      overlay: 'from-forest-600/60 via-forest-500/40 to-forest-400/20',
      particles: 'discovery',
      icon: Sparkles
    },
    {
      id: 'joy',
      title: 'The Joy Reclaimed',
      subtitle: 'Where moments become memories',
      content: [
        "Here, movement becomes memory.",
        "Moments become milestones.",
        "And time...",
        "finally slows down."
      ],
      image: '',
      mood: 'bright',
      overlay: 'from-gold-400/50 via-yellow-300/30 to-orange-200/20',
      particles: 'joyful',
      icon: Heart
    },
    {
      id: 'moments',
      title: 'The Moments In Between',
      subtitle: 'Life in the pauses',
      content: [
        "It's not just a place to play —",
        "It's a place to pause,",
        "To celebrate, to connect,",
        "To truly be."
      ],
      image: '',
      mood: 'golden',
      overlay: 'from-amber-500/40 via-orange-400/30 to-yellow-300/20',
      particles: 'peaceful',
      icon: Clock
    },
    {
      id: 'beginning',
      title: 'Your Story Starts Here',
      subtitle: 'The next chapter awaits',
      content: [
        "This is our story.",
        "But it could be yours too.",
        "Come write your chapter",
        "at The PICKNIK."
      ],
      image: '',
      mood: 'magical',
      overlay: 'from-forest-500/50 via-gold-400/40 to-forest-300/30',
      particles: 'magical',
      icon: Sparkles
    }
  ];

  // Particle system component
  const ParticleSystem: React.FC<{ type: string; isActive: boolean }> = ({ type, isActive }) => {
    const particleCount = type === 'magical' ? 20 : type === 'joyful' ? 15 : 8;
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(particleCount)].map((_, i) => {
          const size = type === 'digital' ? 'w-1 h-1' : 
                     type === 'magical' ? 'w-2 h-2' : 'w-1.5 h-1.5';
          const color = type === 'digital' ? 'bg-blue-400/40' :
                       type === 'nostalgic' ? 'bg-amber-300/50' :
                       type === 'discovery' ? 'bg-green-400/40' :
                       type === 'joyful' ? 'bg-yellow-400/60' :
                       type === 'peaceful' ? 'bg-orange-300/50' :
                       'bg-gold-400/70';
          
          return (
            <div
              key={i}
              className={`absolute ${size} ${color} rounded-full transition-opacity duration-1000 ${
                isActive ? 'opacity-100 animate-float' : 'opacity-0'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
                transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`
              }}
            />
          );
        })}
      </div>
    );
  };

  // Enhanced chapter content with more animations
  const ChapterContent: React.FC<{ chapter: Chapter; index: number; isActive: boolean }> = ({ 
    chapter, 
    index, 
    isActive 
  }) => {
    const [visibleLines, setVisibleLines] = useState(0);
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);

    useEffect(() => {
      if (isActive) {
        setHasBeenVisible(true);
        // Show icon first with longer delay
        setTimeout(() => setShowIcon(true), 800);
        // Then subtitle with longer delay
        setTimeout(() => setShowSubtitle(true), 1200);
        // Then content lines with longer intervals
        const timer = setInterval(() => {
          setVisibleLines(prev => {
            if (prev < chapter.content.length) {
              const newValue = prev + 1;
              // If this is the last line, schedule auto-scroll
              if (newValue === chapter.content.length) {
                setTimeout(() => {
                  const nextChapter = chaptersRef.current[index + 1];
                  if (nextChapter) {
                    nextChapter.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 3000);
              }
              return newValue;
            }
            clearInterval(timer);
            return prev;
          });
        }, 1800);
        return () => clearInterval(timer);
      }
    }, [isActive, chapter.content.length, index]);

    const IconComponent = chapter.icon;

    return (
      <div 
        ref={el => chaptersRef.current[index] = el}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Enhanced Background with True Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-1000"
          style={{ 
            backgroundImage: `url(${chapter.image})`,
            transform: `translateY(${window.scrollY * 0.5}px) scale(1.1)`,
            filter: chapter.mood === 'dark' ? 'grayscale(100%) contrast(1.3) brightness(0.7)' :
                   chapter.mood === 'sepia' ? 'sepia(90%) contrast(1.2) brightness(0.9)' :
                   chapter.mood === 'warm' ? 'saturate(1.3) brightness(1.1) hue-rotate(10deg)' :
                   chapter.mood === 'bright' ? 'saturate(1.4) brightness(1.3) contrast(1.1)' :
                   chapter.mood === 'golden' ? 'saturate(1.5) hue-rotate(20deg) brightness(1.2)' :
                   'saturate(1.2) brightness(1.1) contrast(1.05)'
          }}
        />
        
        {/* Dynamic Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${chapter.overlay} transition-opacity duration-1000 ${
          isActive ? 'opacity-100' : 'opacity-70'
        }`} />
        
        {/* Particle System */}
        <ParticleSystem type={chapter.particles} isActive={isActive} />

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`absolute border border-white/10 transition-all duration-1000 ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                left: `${20 + i * 20}%`,
                top: `${20 + i * 15}%`,
                borderRadius: i % 2 === 0 ? '50%' : '0%',
                animationDelay: `${i * 500}ms`,
                transform: `rotate(${i * 45}deg) translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
              }}
            />
          ))}
        </div>

        {/* Content with Enhanced Animations */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20 pb-32">
          {/* Chapter Icon */}
          <div className={`mb-8 transition-all duration-1500 ${
            (showIcon || hasBeenVisible) ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-8'
          }`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <IconComponent className="w-10 h-10 text-gold-400" />
            </div>
          </div>

          {/* Chapter Subtitle */}
          <div className={`mb-12 transition-all duration-1500 delay-500 ${
            (showSubtitle || hasBeenVisible) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="font-inter text-lg md:text-xl text-gold-400 tracking-wider uppercase">
              {chapter.subtitle}
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6 md:space-y-8">
            {chapter.content.map((line: string, lineIndex: number) => {
              const isVisible = visibleLines > lineIndex || hasBeenVisible;
              return (
                <div
                  key={lineIndex}
                  className={`transition-all duration-1500 ${
                    isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                  }`}
                  style={{ 
                    transitionDelay: `${lineIndex * 500 + 1000}ms` // Increased delay between lines
                  }}
                >
                  <p 
                    className={`font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight ${
                      chapter.mood === 'dark' ? 'text-white' :
                      chapter.mood === 'sepia' ? 'text-amber-100' :
                      'text-cream-50'
                    } drop-shadow-2xl`}
                  >
                    {line}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chapter Progress Dots - Moved to bottom with more padding */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {chapters.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const element = chaptersRef.current[i];
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`transition-all duration-500 hover:scale-125 ${
                  i === index 
                    ? 'w-12 h-3 bg-gold-400 rounded-full shadow-lg shadow-gold-400/50' 
                    : 'w-3 h-3 bg-white/40 rounded-full hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Hint with Animation */}
        {index === 0 && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex flex-col items-center space-y-2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center relative overflow-hidden">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
              </div>
              <p className="text-white/60 font-inter text-sm tracking-wider">SCROLL TO CONTINUE</p>
            </div>
          </div>
        )}

        {/* Chapter Transition Effect */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-1000 pointer-events-none ${
          isActive ? 'opacity-0' : 'opacity-20'
        }`} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black relative">
      <Navbar />
      
      {/* Enhanced Audio Controls */}
      <div className="fixed top-24 right-4 md:right-6 z-50 flex flex-col space-y-3">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-2 border border-white/10">
          <button
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className="text-white p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            title={isAudioEnabled ? "Mute Audio" : "Enable Audio"}
          >
            {isAudioEnabled ? (
              <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            ) : (
              <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            title={isPlaying ? "Pause Narration" : "Play Narration"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 group-hover:scale-110 transition-transform" />
            ) : (
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        {/* Audio Visualizer */}
        {isAudioEnabled && (
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div className="flex items-end space-x-1 h-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gold-400/60 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 20 + 8}px`,
                    animationDelay: `${i * 100}ms`,
                    animationDuration: `${800 + Math.random() * 400}ms`
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-black/20">
          <div 
            className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300 shadow-lg shadow-gold-400/30"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Enhanced Chapter Navigation */}
      <div className="fixed left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="flex flex-col space-y-6">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-500 ${
                  currentChapter === index ? 'scale-110' : 'hover:scale-105'
                }`}
                onClick={() => {
                  const element = chaptersRef.current[index];
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
                    currentChapter === index 
                      ? 'bg-gold-400 shadow-lg shadow-gold-400/50 scale-125' 
                      : 'bg-white/30 hover:bg-white/50 group-hover:scale-110'
                  }`} />
                  <div className={`text-xs font-inter transition-all duration-300 whitespace-nowrap ${
                    currentChapter === index 
                      ? 'text-gold-400 opacity-100' 
                      : 'text-white/60 opacity-0 group-hover:opacity-100'
                  }`}>
                    {chapter.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Chapter Indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 lg:hidden">
        <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
          <div className="flex items-center space-x-2">
            <span className="text-white/60 font-inter text-sm">
              {currentChapter + 1} / {chapters.length}
            </span>
            <div className="flex space-x-1">
              {chapters.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentChapter ? 'bg-gold-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="relative">
        {chapters.map((chapter, index) => (
          <ChapterContent
            key={chapter.id}
            chapter={chapter}
            index={index}
            isActive={currentChapter === index}
          />
        ))}
      </div>

      {/* Enhanced Final CTA Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-forest-500 via-forest-600 to-forest-700 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-gold-400 rounded-full animate-pulse"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 500}ms`,
                animationDuration: `${3000 + Math.random() * 2000}ms`
              }}
            />
          ))}
        </div>

        {/* Interactive Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gold-400/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 6}s`,
                transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Logo Animation */}
          <div className="mb-16">
            <div className="inline-flex items-center space-x-4 mb-8 group">
              <div className="relative">
                <div className="w-20 h-20 bg-gold-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="w-12 h-12 bg-forest-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-gold-400 animate-pulse" />
                  </div>
                </div>
                <div className="absolute -inset-2 bg-gold-400/20 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-cream-50 group-hover:text-gold-400 transition-colors duration-500">
                  The PICKNIK
                </h1>
                <p className="text-gold-400 font-inter text-sm tracking-wider">
                  A PLACE BEYOND TIME
                </p>
              </div>
            </div>
          </div>

          <h2 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream-50 mb-8 leading-tight hover:scale-105 transition-transform duration-500">
            Your Chapter
          </h2>
          <h3 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-light text-gold-400 mb-16 hover:scale-105 transition-transform duration-500">
            Awaits
          </h3>

          <p className="text-cream-200 text-xl md:text-2xl font-inter leading-relaxed mb-20 max-w-4xl mx-auto hover:text-cream-100 transition-colors duration-300">
            Every story needs a place to unfold. Every memory needs a moment to begin. 
            Your tale of connection, joy, and timeless moments starts here.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16">
            <button className="group relative bg-gold-400 hover:bg-gold-500 text-forest-500 px-16 py-6 rounded-full font-semibold text-xl transition-all duration-500 hover:shadow-2xl hover:shadow-gold-400/30 hover:scale-105 overflow-hidden">
              <span className="relative z-10 flex items-center space-x-3">
                <span>Begin Your Story</span>
                <div className="w-3 h-3 bg-forest-500 rounded-full group-hover:animate-ping"></div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
            
            <button className="group flex items-center space-x-4 text-cream-100 hover:text-gold-400 font-inter font-medium text-lg transition-all duration-500">
              <span>Explore Our World</span>
              <div className="relative w-12 h-12 border-2 border-cream-100 group-hover:border-gold-400 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-90">
                <ChevronDown className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gold-400/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </div>
            </button>
          </div>

          {/* Enhanced Audio Visualization */}
          {isAudioEnabled && (
            <div className="flex justify-center space-x-3">
              <div className="text-gold-400/60 font-inter text-sm mr-4">Now Playing</div>
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-gold-400 to-gold-300 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 30 + 15}px`,
                    animationDelay: `${i * 150}ms`,
                    animationDuration: `${1200 + Math.random() * 800}ms`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurTalesPage;