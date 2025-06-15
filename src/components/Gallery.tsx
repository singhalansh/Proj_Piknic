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
      { threshold: 0.2 }
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
    <section id="gallery" ref={sectionRef} className="py-20 bg-forest-500 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-500 via-forest-600 to-forest-700"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-gold-400/10 rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-cream-100/5 rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Moments at The PICKNIK
          </h2>
          <p className="text-xl text-cream-100 max-w-3xl mx-auto font-inter leading-relaxed">
            Every photograph tells a story, every smile captures a memory, 
            every moment becomes part of our beautiful tapestry.
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
                className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gold-400 text-forest-500 shadow-lg'
                    : 'bg-forest-400/50 text-cream-100 hover:bg-forest-400 border border-cream-100/20'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-inter font-medium">{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="group relative bg-forest-400/30 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500"
              onClick={() => setSelectedImage(item.id)}
            >
              <div className="aspect-square relative">
                <img 
                  src={item.src} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-playfair text-lg font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-cream-100 text-sm font-inter">
                    {item.description}
                  </p>
                </div>

                {/* Hover Actions */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-gold-400 hover:bg-gold-500 text-forest-500 p-2 rounded-full transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="bg-gold-400 hover:bg-gold-500 text-forest-500 p-2 rounded-full transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* User Generated Content Section */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-forest-400/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-cream-100/10">
            <div className="text-center">
              <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
                Share Your PICKNIK Moment
              </h3>
              <p className="text-cream-100 font-inter text-lg mb-8 max-w-2xl mx-auto">
                Tag us @thepicknik or use #PicknikMoments to share your experiences and 
                become part of our growing gallery of memories.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="bg-gold-400 hover:bg-gold-500 text-forest-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl flex items-center space-x-3">
                  <Camera className="w-5 h-5" />
                  <span>Upload Your Photo</span>
                </button>
                
                <div className="flex items-center space-x-4 text-cream-100">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-gold-400" />
                    <span className="font-inter text-sm">2.4k Memories Shared</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Camera className="w-5 h-5 text-gold-400" />
                    <span className="font-inter text-sm">Growing Daily</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Feed Preview */}
        <div className={`mt-16 transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center">
            <h4 className="font-playfair text-2xl font-semibold mb-6 text-gold-400">
              Follow Our Journey @thepicknik
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {galleryItems.slice(0, 4).map((item, index) => (
                <div key={index} className="aspect-square rounded-xl overflow-hidden group cursor-pointer">
                  <img 
                    src={item.src} 
                    alt={`Instagram ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            <button className="mt-6 text-gold-400 hover:text-gold-300 font-inter font-semibold flex items-center space-x-2 mx-auto transition-colors">
              <span>View on Instagram</span>
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for selected image would go here */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={galleryItems.find(item => item.id === selectedImage)?.src} 
              alt="Selected"
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
            <button 
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;