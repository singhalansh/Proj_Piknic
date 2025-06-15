import React, { useEffect, useRef, useState } from 'react';
import { Camera, Play, Heart, Filter, Download, Share2, X } from 'lucide-react';

const Gallery: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filters = [
    { id: 'all', label: 'All Moments', icon: Camera },
    { id: 'play', label: 'Play', icon: Play },
    { id: 'laugh', label: 'Laugh', icon: Heart },
    { id: 'unwind', label: 'Unwind', icon: Filter },
    { id: 'celebrate', label: 'Celebrate', icon: Share2 }
  ];

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.pexels.com/photos/8611100/pexels-photo-8611100.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'play',
      title: 'Championship Moment',
      description: 'Victory tastes sweeter when shared'
    },
    {
      id: 2,
      type: 'image',
      src: 'https://images.pexels.com/photos/8611353/pexels-photo-8611353.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'laugh',
      title: 'Family Joy',
      description: 'Three generations, one game, endless laughter'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'unwind',
      title: 'Café Conversations',
      description: 'Where stories flow as smoothly as coffee'
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'celebrate',
      title: 'Birthday Magic',
      description: 'Another year older, infinitely happier'
    },
    {
      id: 5,
      type: 'image',
      src: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'unwind',
      title: 'Morning Serenity',
      description: 'Finding peace in movement'
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'play',
      title: 'Team Spirit',
      description: 'Building bonds, one game at a time'
    },
    {
      id: 7,
      type: 'image',
      src: 'https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'celebrate',
      title: 'Pro Shop Pride',
      description: 'Gear that matches your passion'
    },
    {
      id: 8,
      type: 'image',
      src: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'unwind',
      title: 'Luxury Details',
      description: 'Comfort in every corner'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-cream-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gold-400/5 rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-forest-500/5 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-forest-500 mb-6">
            Moments at PICKNIK
          </h2>
          <p className="text-xl text-forest-600 max-w-3xl mx-auto font-inter leading-relaxed">
            Every click captures a story, every frame holds a memory, every moment becomes timeless.
          </p>
          <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-forest-500 text-cream-50'
                    : 'bg-forest-100 text-forest-600 hover:bg-forest-200'
                }`}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-inter font-medium text-sm sm:text-base">{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-cream-50 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-cream-100 font-inter text-sm sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-cream-50 hover:text-gold-400 transition-colors"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <div className="relative max-w-4xl w-full">
              <img
                src={galleryItems[selectedImage].src}
                alt={galleryItems[selectedImage].title}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-cream-50 mb-2">
                  {galleryItems[selectedImage].title}
                </h3>
                <p className="text-cream-100 font-inter text-sm sm:text-base">
                  {galleryItems[selectedImage].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;