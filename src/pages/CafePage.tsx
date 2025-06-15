import React, { useEffect, useRef, useState } from 'react';
import { Coffee, Heart, Clock, Users, Star, Utensils, Music, Wifi, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CafePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const menuCategories = [
    {
      name: "Artisan Coffee",
      items: [
        {
          name: "Golden Hour Latte",
          description: "Smooth espresso with steamed milk, touched with honey and cinnamon",
          price: "₹280",
          image: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=400",
          story: "Inspired by the perfect light that graces our courts at sunset"
        },
        {
          name: "Champion's Americano",
          description: "Bold, rich espresso with hot water - fuel for champions",
          price: "₹220",
          image: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=400",
          story: "Strong enough to power through your longest rallies"
        },
        {
          name: "Courtside Cold Brew",
          description: "Smooth, refreshing cold brew with a hint of vanilla",
          price: "₹320",
          image: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=400",
          story: "Perfect for those warm afternoon games"
        }
      ]
    },
    {
      name: "Nourishing Meals",
      items: [
        {
          name: "Post-Game Power Bowl",
          description: "Quinoa, grilled chicken, avocado, and seasonal vegetables",
          price: "₹480",
          image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400",
          story: "Designed to refuel your body after an intense match"
        },
        {
          name: "Sunrise Pancakes",
          description: "Fluffy pancakes with fresh berries and maple syrup",
          price: "₹380",
          image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400",
          story: "Soft as laughter, sweet as victory"
        },
        {
          name: "Garden Fresh Salad",
          description: "Mixed greens, cherry tomatoes, feta, and balsamic dressing",
          price: "₹320",
          image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400",
          story: "Fresh ingredients from local gardens"
        }
      ]
    },
    {
      name: "Refreshing Drinks",
      items: [
        {
          name: "Victory Smoothie",
          description: "Mango, banana, yogurt, and a touch of honey",
          price: "₹280",
          image: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=400",
          story: "Tastes like a golden hour celebration"
        },
        {
          name: "Hydration Hero",
          description: "Coconut water with fresh lime and mint",
          price: "₹180",
          image: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=400",
          story: "Nature's perfect sports drink"
        },
        {
          name: "Sunset Iced Tea",
          description: "House-blend iced tea with peach and herbs",
          price: "₹220",
          image: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=400",
          story: "Refreshing as an evening breeze"
        }
      ]
    }
  ];

  const ambientImages = [
    {
      src: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Morning light streaming through our windows"
    },
    {
      src: "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Cozy corners for quiet conversations"
    },
    {
      src: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Celebrations shared over delicious meals"
    },
    {
      src: "https://images.pexels.com/photos/8611353/pexels-photo-8611353.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Families creating memories together"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % ambientImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + ambientImages.length) % ambientImages.length);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-forest-600 via-forest-500 to-forest-700">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="w-full h-full bg-[url('https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-60"></div>
          </div>
        </div>

        {/* Floating Coffee Steam Animation */}
        <div className="absolute top-1/4 left-1/4 w-2 h-8 bg-cream-100/30 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-6 bg-gold-400/40 rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-7 bg-cream-100/20 rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }}></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className={`transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-cream-50 mb-8 leading-tight">
              Where the Game Pauses
            </h1>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-light text-gold-400 mb-12">
              and the Heart Lingers
            </h2>
            
            <div className="max-w-3xl mx-auto mb-16">
              <p className="text-cream-200 text-xl font-inter leading-relaxed opacity-90">
                More than a café, this is where stories unfold over steaming cups, 
                where victories are celebrated, and where every sip tastes like belonging.
              </p>
            </div>

            {/* Ambient Sound Toggle */}
            <div className="flex items-center justify-center gap-8 mb-16">
              <button className="flex items-center space-x-3 bg-gold-400/20 backdrop-blur-sm border border-gold-400/30 rounded-full px-8 py-4 text-cream-100 hover:bg-gold-400/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-full border-2 border-gold-400 flex items-center justify-center">
                  <Play className="w-5 h-5 ml-1 text-gold-400" />
                </div>
                <span className="font-inter font-medium">Café Ambience</span>
              </button>
              
              <button className="flex items-center space-x-3 bg-forest-400/20 backdrop-blur-sm border border-cream-100/30 rounded-full px-8 py-4 text-cream-100 hover:bg-forest-400/30 transition-all duration-300">
                <Music className="w-6 h-6 text-cream-100" />
                <span className="font-inter font-medium">Our Playlist</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Café Philosophy */}
      <section ref={sectionRef} className="py-20 bg-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-500 mb-6">
              A Philosophy of Slow
            </h2>
            <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full mb-8"></div>
            <p className="text-forest-600 text-xl max-w-4xl mx-auto font-inter leading-relaxed">
              In a world that rushes, we invite you to pause. To savor not just the flavors 
              on your palate, but the conversations that matter, the laughter that heals, 
              and the quiet moments that restore.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className={`text-center transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="bg-forest-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Coffee className="w-10 h-10 text-gold-400" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-forest-500 mb-4">
                Artisan Crafted
              </h3>
              <p className="text-forest-600 font-inter leading-relaxed">
                Every cup tells a story of carefully selected beans, expert roasting, 
                and the gentle art of brewing perfection.
              </p>
            </div>

            <div className={`text-center transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="bg-forest-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-gold-400" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-forest-500 mb-4">
                Made with Love
              </h3>
              <p className="text-forest-600 font-inter leading-relaxed">
                Our chefs pour passion into every dish, creating nourishing meals 
                that fuel both body and soul.
              </p>
            </div>

            <div className={`text-center transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="bg-forest-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-gold-400" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-forest-500 mb-4">
                Community Centered
              </h3>
              <p className="text-forest-600 font-inter leading-relaxed">
                A gathering place where strangers become friends and every table 
                holds the potential for meaningful connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Showcase */}
      <section className="py-20 bg-forest-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Curated with Care
            </h2>
            <p className="text-cream-100 text-xl max-w-3xl mx-auto font-inter">
              Each item on our menu has been thoughtfully crafted to complement 
              your PICKNIK experience.
            </p>
            <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Menu Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {menuCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveMenuItem(index)}
                className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                  activeMenuItem === index
                    ? 'bg-gold-400 text-forest-500 shadow-lg'
                    : 'bg-forest-400/50 text-cream-100 hover:bg-forest-400 border border-cream-100/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuCategories[activeMenuItem].items.map((item, index) => (
              <div key={index} className="bg-forest-400/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-cream-100/10 hover:bg-forest-400/40 transition-all duration-300 group">
                <div className="aspect-video relative">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-600/70 to-transparent"></div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-gold-400 text-forest-500 px-3 py-1 rounded-full font-semibold">
                      {item.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold mb-2">
                    {item.name}
                  </h3>
                  <p className="text-cream-100 font-inter mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-gold-400 font-inter text-sm italic">
                    {item.story}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambience Gallery */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-500 mb-6">
              The Ambience
            </h2>
            <p className="text-forest-600 text-xl max-w-3xl mx-auto font-inter">
              Step inside and feel the warmth of carefully curated spaces 
              designed for comfort and connection.
            </p>
            <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Image Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={ambientImages[currentImageIndex].src}
                alt={ambientImages[currentImageIndex].caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white font-playfair text-xl">
                  {ambientImages[currentImageIndex].caption}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {ambientImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-gold-400' : 'bg-forest-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Café Features */}
      <section className="py-20 bg-forest-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Thoughtful Details
            </h2>
            <p className="text-cream-100 text-xl max-w-3xl mx-auto font-inter">
              Every element designed to enhance your comfort and experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-forest-500" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-2">High-Speed WiFi</h3>
              <p className="text-cream-100 font-inter text-sm">Stay connected while you unwind</p>
            </div>

            <div className="text-center">
              <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-forest-500" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-2">Extended Hours</h3>
              <p className="text-cream-100 font-inter text-sm">Open early morning to late evening</p>
            </div>

            <div className="text-center">
              <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-forest-500" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-2">Fresh Daily</h3>
              <p className="text-cream-100 font-inter text-sm">All ingredients sourced fresh daily</p>
            </div>

            <div className="text-center">
              <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-forest-500" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-2">Member Perks</h3>
              <p className="text-cream-100 font-inter text-sm">Exclusive discounts for members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events in the Café */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-500 mb-6">
              Café Transformations
            </h2>
            <p className="text-forest-600 text-xl max-w-3xl mx-auto font-inter">
              Watch our space transform for special occasions, intimate gatherings, 
              and memorable celebrations.
            </p>
            <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-video">
                <img 
                  src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Birthday celebrations"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-forest-500 mb-2">
                  Birthday Celebrations
                </h3>
                <p className="text-forest-600 font-inter leading-relaxed">
                  Transform our space into a magical birthday venue with custom decorations and special menus.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-video">
                <img 
                  src="https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Quiet moments"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-forest-500 mb-2">
                  Solo Journaling
                </h3>
                <p className="text-forest-600 font-inter leading-relaxed">
                  Find your perfect corner for quiet reflection, reading, or creative work in peaceful ambiance.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-video">
                <img 
                  src="https://images.pexels.com/photos/8611353/pexels-photo-8611353.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Weekend brunches"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-forest-500 mb-2">
                  Weekend Brunches
                </h3>
                <p className="text-forest-600 font-inter leading-relaxed">
                  Extended brunch menus and special weekend atmosphere for leisurely family gatherings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-400 to-gold-500 text-forest-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Your Table Awaits
          </h3>
          <p className="font-inter text-xl md:text-2xl opacity-90 mb-12 leading-relaxed">
            Come as you are. Leave feeling nourished, connected, and ready 
            to embrace whatever comes next.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-forest-500 hover:bg-forest-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl">
              Reserve Your Table
            </button>
            <button className="flex items-center space-x-2 text-forest-500 hover:text-forest-600 font-semibold">
              <span>View Full Menu</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CafePage;