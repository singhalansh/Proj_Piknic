import React, { useEffect, useRef, useState } from 'react';
import { Zap, Trophy, Coffee, ShoppingBag, Sparkles, Users, Award, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Experience: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('courts');
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const experiences = {
    courts: {
      title: 'The Courts',
      subtitle: 'ITF-Certified Excellence',
      description: 'Four pristine courts featuring our signature 10-layer professional surface, designed for players who demand perfection in every game.',
      features: [
        'ITF-certified playing surfaces',
        '10-layer professional construction',
        'Professional lighting system',
        'Climate-optimized environment',
        'Spectator viewing areas',
        'Pro-level equipment included'
      ],
      image: 'https://images.pexels.com/photos/8611100/pexels-photo-8611100.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Zap
    },
    coaching: {
      title: 'Coaching Programs',
      subtitle: 'From Beginner to Champion',
      description: 'Personalized coaching programs designed to elevate your game, whether you\'re picking up a paddle for the first time or competing at elite levels.',
      features: [
        'Certified professional coaches',
        'Beginner to advanced programs',
        'Private and group sessions',
        'Youth development programs',
        'Corporate team building',
        'Tournament preparation'
      ],
      image: 'https://images.pexels.com/photos/8611353/pexels-photo-8611353.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Trophy
    },
    cafe: {
      title: 'The Café',
      subtitle: 'Nourish Your Soul',
      description: 'A warm, inviting space where artisan coffee meets gourmet cuisine, creating the perfect atmosphere for post-game conversations and community connections.',
      features: [
        'Artisan coffee and teas',
        'Gourmet healthy meals',
        'Fresh smoothies and juices',
        'Comfortable seating areas',
        'Free Wi-Fi throughout',
        'Community gathering space'
      ],
      image: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Coffee
    },
    shop: {
      title: 'Pro Shop',
      subtitle: 'Premium Gear & Apparel',
      description: 'Curated selection of premium pickleball equipment, stylish apparel, and exclusive PICKNIK merchandise for the discerning player.',
      features: [
        'Premium paddle selection',
        'Professional apparel',
        'Exclusive PICKNIK merchandise',
        'Equipment rentals available',
        'Expert gear consultation',
        'Member exclusive items'
      ],
      image: 'https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: ShoppingBag
    },
    wellness: {
      title: 'Luxury Amenities',
      subtitle: 'Comfort Redefined',
      description: 'Every detail crafted for your comfort, featuring premium facilities that set new standards for sports and leisure destinations.',
      features: [
        'Luxury locker rooms',
        'Premium shower facilities',
        'Family-friendly amenities',
        'Concierge services',
        'Valet parking available',
        'Private event spaces'
      ],
      image: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Sparkles
    }
  };

  // Helper to scroll to contact section
  const scrollToContact = () => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'contact' } });
      return;
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-forest-500 text-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-forest-500 to-forest-700"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The Experience
          </h2>
          <p className="text-xl text-cream-100 max-w-3xl mx-auto font-inter">
            Five distinct spaces, one extraordinary destination
          </p>
          <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Tab Navigation */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {Object.entries(experiences).map(([key, exp]) => {
            const IconComponent = exp.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-gold-400 text-forest-500'
                    : 'bg-forest-400/50 text-cream-100 hover:bg-forest-400'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-inter font-medium">{exp.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                src={experiences[activeTab as keyof typeof experiences].image}
                alt={experiences[activeTab as keyof typeof experiences].title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-600/50 to-transparent rounded-2xl"></div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-forest-400/30 backdrop-blur-sm rounded-2xl p-8 border border-cream-100/10">
              <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
                {experiences[activeTab as keyof typeof experiences].title}
              </h3>
              <p className="text-gold-400 font-inter text-lg font-semibold mb-4">
                {experiences[activeTab as keyof typeof experiences].subtitle}
              </p>
              <p className="text-cream-100 font-inter text-lg leading-relaxed mb-8">
                {experiences[activeTab as keyof typeof experiences].description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {experiences[activeTab as keyof typeof experiences].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gold-400 rounded-full flex-shrink-0"></div>
                    <span className="text-cream-100 font-inter">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex space-x-4">
                <button className="bg-gold-400 hover:bg-gold-500 text-forest-500 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg">
                  Learn More
                </button>
                <button className="border border-cream-100/30 hover:border-gold-400 text-cream-100 hover:text-gold-400 px-6 py-3 rounded-full font-semibold transition-all duration-300" onClick={scrollToContact}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center">
            <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-forest-500" />
            </div>
            <h4 className="font-playfair text-3xl font-bold text-gold-400 mb-2">4</h4>
            <p className="text-cream-100 font-inter">Professional Courts</p>
          </div>
          <div className="text-center">
            <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-forest-500" />
            </div>
            <h4 className="font-playfair text-3xl font-bold text-gold-400 mb-2">500+</h4>
            <p className="text-cream-100 font-inter">Happy Members</p>
          </div>
          <div className="text-center">
            <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-forest-500" />
            </div>
            <h4 className="font-playfair text-3xl font-bold text-gold-400 mb-2">10</h4>
            <p className="text-cream-100 font-inter">Layer Pro Surface</p>
          </div>
          <div className="text-center">
            <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-forest-500" />
            </div>
            <h4 className="font-playfair text-3xl font-bold text-gold-400 mb-2">∞</h4>
            <p className="text-cream-100 font-inter">Memories Made</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;