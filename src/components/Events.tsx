import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, Users, Heart, Trophy, Building, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Events: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const eventTypes = [
    {
      id: 'celebrations',
      title: 'Celebrations',
      subtitle: 'Birthday Parties & Special Moments',
      description: 'Transform birthdays and special occasions into unforgettable memories with our curated celebration packages.',
      icon: Heart,
      image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Custom decorations', 'Dedicated event coordinator', 'Catering options', 'Photo opportunities', 'Gift bags for guests'],
      price: 'Starting ₹15,000'
    },
    {
      id: 'family',
      title: 'Family Days',
      subtitle: 'Parent-Child Sports Adventures',
      description: 'Strengthen family bonds through sport, laughter, and shared victories on our premium courts.',
      icon: Users,
      image: 'https://images.pexels.com/photos/8611353/pexels-photo-8611353.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['All-age friendly activities', 'Professional coaching', 'Family photo sessions', 'Healthy snacks included', 'Take-home memories'],
      price: 'Starting ₹8,000'
    },
    {
      id: 'corporate',
      title: 'Corporate Retreats',
      subtitle: 'Team Building Redefined',
      description: 'Elevate team dynamics and foster genuine connections in our inspiring environment.',
      icon: Building,
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Team building activities', 'Meeting spaces', 'Catered meals', 'Professional facilitation', 'Custom packages'],
      price: 'Starting ₹25,000'
    },
    {
      id: 'wellness',
      title: 'Wellness Mornings',
      subtitle: 'Mind, Body & Soul',
      description: 'Begin your day with intention through yoga, meditation, and gentle movement in nature.',
      icon: Sparkles,
      image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Sunrise yoga sessions', 'Meditation guidance', 'Healthy breakfast', 'Aromatherapy', 'Take-home wellness kit'],
      price: 'Starting ₹3,500'
    },
    {
      id: 'celebrity',
      title: 'Celebrity Matches',
      subtitle: 'Exhibition & Entertainment',
      description: 'Witness world-class talent and be part of exclusive sporting entertainment.',
      icon: Trophy,
      image: 'https://images.pexels.com/photos/8611100/pexels-photo-8611100.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Celebrity players', 'VIP seating', 'Meet & greet opportunities', 'Professional photography', 'Exclusive merchandise'],
      price: 'Starting ₹2,500'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Sunset Doubles Tournament',
      date: 'December 28, 2024',
      time: '5:00 PM - 8:00 PM',
      category: 'Competition',
      spots: '16 spots left',
      image: 'https://images.pexels.com/photos/8611100/pexels-photo-8611100.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: true
    },
    {
      title: 'New Year Family Brunch',
      date: 'January 1, 2025',
      time: '11:00 AM - 3:00 PM',
      category: 'Family',
      spots: '8 spots left',
      image: 'https://images.pexels.com/photos/8611353/pexels-photo-8611353.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false
    },
    {
      title: 'Corporate Leadership Retreat',
      date: 'January 5, 2025',
      time: '9:00 AM - 6:00 PM',
      category: 'Corporate',
      spots: 'Private event',
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false
    },
    {
      title: 'Morning Wellness Circle',
      date: 'January 7, 2025',
      time: '6:30 AM - 9:00 AM',
      category: 'Wellness',
      spots: '12 spots left',
      image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false
    }
  ];

  const filteredEvents = activeFilter === 'all' ? eventTypes : eventTypes.filter(event => event.id === activeFilter);

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
    <section id="events" ref={sectionRef} className="py-20 bg-cream-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gold-400/5 rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-forest-500/5 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-forest-500 mb-6">
            Events & Celebrations
          </h2>
          <p className="text-xl text-forest-600 max-w-3xl mx-auto font-inter leading-relaxed">
            Where every gathering becomes a treasured memory, every celebration tells a story, 
            and every moment shared creates lasting bonds.
          </p>
          <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full mt-6"></div>
        </div>

        {/* What's Happening This Weekend */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-forest-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-forest-500 via-forest-600 to-forest-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
                    What's Happening This Weekend?
                  </h3>
                  <p className="text-cream-100 font-inter text-lg">
                    Don't miss these exclusive experiences
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-2 bg-gold-400 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-forest-500" />
                  <span className="text-forest-500 font-inter font-semibold text-sm">Live Updates</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-cream-100/20 hover:bg-white/15 transition-all duration-300 group">
                    <div className="relative mb-4">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      {event.urgent && (
                        <div className="absolute top-2 right-2 bg-gold-400 text-forest-500 px-2 py-1 rounded-full text-xs font-semibold">
                          Filling Fast
                        </div>
                      )}
                    </div>
                    <h4 className="font-playfair text-lg font-semibold mb-2 group-hover:text-gold-400 transition-colors">
                      {event.title}
                    </h4>
                    <div className="space-y-2 text-sm text-cream-100">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{event.spots}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-gold-400 hover:bg-gold-500 text-forest-500 py-2 rounded-full font-semibold text-sm transition-all duration-300 group-hover:scale-105">
                      Reserve Spot
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Event Types Filter */}
        <div className={`mb-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-forest-500 text-cream-50 shadow-lg'
                  : 'bg-white text-forest-500 hover:bg-forest-50 border border-forest-200'
              }`}
            >
              All Events
            </button>
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveFilter(type.id)}
                className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                  activeFilter === type.id
                    ? 'bg-forest-500 text-cream-50 shadow-lg'
                    : 'bg-white text-forest-500 hover:bg-forest-50 border border-forest-200'
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>
        </div>

        {/* Event Types Grid */}
        <div className={`grid lg:grid-cols-2 gap-8 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {filteredEvents.map((event, index) => {
            const IconComponent = event.icon;
            return (
              <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
                <div className="relative h-64">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-600/70 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-gold-400 p-2 rounded-full">
                        <IconComponent className="w-5 h-5 text-forest-500" />
                      </div>
                      <span className="text-gold-400 font-inter font-semibold">{event.price}</span>
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-white mb-1">
                      {event.title}
                    </h3>
                    <p className="text-cream-100 font-inter text-sm">
                      {event.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-forest-700 font-inter text-lg leading-relaxed mb-6">
                    {event.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {event.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gold-400 rounded-full flex-shrink-0"></div>
                        <span className="text-forest-600 font-inter">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex-1 bg-forest-500 hover:bg-forest-600 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg" onClick={scrollToContact}>
                      Book Event
                    </button>
                    <button className="flex items-center justify-center w-12 h-12 border-2 border-forest-500 text-forest-500 hover:bg-forest-500 hover:text-white rounded-full transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-gold-400 to-gold-500 rounded-3xl p-12 text-forest-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-24 translate-y-24"></div>
            <div className="relative z-10">
              <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
                Ready to Create Your Perfect Event?
              </h3>
              <p className="font-inter text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
                Let our dedicated event coordinators craft an experience that exceeds your dreams. 
                Every detail, every moment, perfectly orchestrated.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="bg-forest-500 hover:bg-forest-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl">
                  Plan Your Event
                </button>
                <button className="flex items-center space-x-2 text-forest-500 hover:text-forest-600 font-semibold">
                  <span>Call Event Coordinator</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;