import React, { useEffect, useRef, useState } from 'react';
import { Crown, Star, Zap, Heart, Gift, Users, Calendar, Trophy, Check, ArrowRight } from 'lucide-react';

const Membership: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTier, setActiveTier] = useState('enthusiast');
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

  const membershipTiers = [
    {
      id: 'explorer',
      name: 'The Explorer',
      subtitle: 'For the Curious',
      price: '₹1,500',
      period: 'per visit',
      color: 'forest',
      icon: Star,
      description: 'Perfect for discovering the magic of The PICKNIK',
      features: [
        'Court access for 2 hours',
        'Equipment rental included',
        'Café access',
        'Basic shower facilities',
        'Guest privileges',
        'Introductory coaching session'
      ],
      popular: false
    },
    {
      id: 'enthusiast',
      name: 'The Enthusiast',
      subtitle: 'For the Passionate',
      price: '₹8,500',
      period: 'per month',
      color: 'gold',
      icon: Heart,
      description: 'For those who want to make The PICKNIK their second home',
      features: [
        'Unlimited court access',
        'Premium equipment included',
        'Full café privileges',
        'Luxury amenities access',
        'Monthly guest passes (4)',
        'Group coaching sessions',
        'Event discounts (20%)',
        'Priority booking'
      ],
      popular: true
    },
    {
      id: 'legacy',
      name: 'The Legacy',
      subtitle: 'For the Connoisseur',
      price: '₹25,000',
      period: 'per month',
      color: 'premium',
      icon: Crown,
      description: 'The ultimate PICKNIK experience with exclusive privileges',
      features: [
        'Unlimited premium access',
        'Professional gear collection',
        'VIP lounge access',
        'Personal concierge service',
        'Unlimited guest privileges',
        'Private coaching sessions',
        'Exclusive events invitation',
        'Complimentary event hosting',
        'Valet parking',
        'Take-home amenities'
      ],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Trophy,
      title: 'Championship Standards',
      description: 'ITF-certified courts with professional-grade surfaces'
    },
    {
      icon: Users,
      title: 'Community Connection',
      description: 'Join a vibrant community of passionate players'
    },
    {
      icon: Calendar,
      title: 'Exclusive Events',
      description: 'Access to member-only tournaments and social gatherings'
    },
    {
      icon: Gift,
      title: 'Luxury Amenities',
      description: 'Premium facilities designed for your comfort'
    }
  ];

  return (
    <section id="membership" ref={sectionRef} className="py-20 bg-cream-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gold-400/5 rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-forest-500/5 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-forest-500 mb-6">
            Membership & Access
          </h2>
          <p className="text-xl text-forest-600 max-w-3xl mx-auto font-inter leading-relaxed">
            Choose your path to extraordinary experiences. Each membership tier is crafted 
            to enhance your journey at The PICKNIK.
          </p>
          <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Benefits Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-forest-500 to-forest-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-10 h-10 text-gold-400" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-forest-500 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-forest-600 font-inter leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Membership Tiers */}
        <div className={`grid lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {membershipTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            const isActive = activeTier === tier.id;
            
            return (
              <div 
                key={tier.id}
                className={`relative rounded-3xl p-8 cursor-pointer transition-all duration-500 ${
                  tier.popular 
                    ? 'bg-gradient-to-br from-gold-400 to-gold-500 text-forest-500 scale-105 shadow-2xl' 
                    : 'bg-white text-forest-500 hover:shadow-xl border border-forest-100'
                } ${isActive ? 'ring-4 ring-gold-400/50' : ''}`}
                onClick={() => setActiveTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-forest-500 text-gold-400 px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    tier.popular ? 'bg-forest-500/20' : 'bg-gold-400'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      tier.popular ? 'text-forest-500' : 'text-forest-500'
                    }`} />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold mb-2">
                    {tier.name}
                  </h3>
                  <p className={`font-inter text-sm mb-4 ${
                    tier.popular ? 'text-forest-600' : 'text-forest-600'
                  }`}>
                    {tier.subtitle}
                  </p>
                  <div className="mb-4">
                    <span className="font-playfair text-4xl font-bold">
                      {tier.price}
                    </span>
                    <span className={`font-inter text-sm ${
                      tier.popular ? 'text-forest-600' : 'text-forest-500'
                    }`}>
                      {tier.period}
                    </span>
                  </div>
                  <p className={`font-inter text-sm ${
                    tier.popular ? 'text-forest-600' : 'text-forest-600'
                  }`}>
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        tier.popular ? 'bg-forest-500/20' : 'bg-gold-400/20'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          tier.popular ? 'text-forest-500' : 'text-gold-600'
                        }`} />
                      </div>
                      <span className={`font-inter text-sm ${
                        tier.popular ? 'text-forest-600' : 'text-forest-600'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                  tier.popular 
                    ? 'bg-forest-500 hover:bg-forest-600 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-forest-500 hover:bg-forest-600 text-white hover:shadow-lg'
                }`}>
                  {tier.popular ? 'Start Your Journey' : 'Choose This Plan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Membership Perks */}
        <div className={`transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-forest-500 to-forest-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8611100/pexels-photo-8611100.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10 text-center">
              <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Why Choose Membership?
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-forest-500" />
                  </div>
                  <h4 className="font-playfair text-xl font-semibold mb-2">Priority Access</h4>
                  <p className="text-cream-100 font-inter">Never wait for court time. Members get guaranteed slots.</p>
                </div>
                <div>
                  <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-forest-500" />
                  </div>
                  <h4 className="font-playfair text-xl font-semibold mb-2">Exclusive Community</h4>
                  <p className="text-cream-100 font-inter">Connect with like-minded individuals who share your passion.</p>
                </div>
                <div>
                  <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-forest-500" />
                  </div>
                  <h4 className="font-playfair text-xl font-semibold mb-2">Member Benefits</h4>
                  <p className="text-cream-100 font-inter">Exclusive discounts, events, and special privileges.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="bg-gold-400 hover:bg-gold-500 text-forest-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl">
                  Join The Community
                </button>
                <button className="flex items-center space-x-2 text-cream-100 hover:text-gold-400 transition-colors">
                  <span className="font-inter font-medium">Schedule a Tour</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Member Testimonials */}
        <div className={`mt-20 transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-12">
            <h3 className="font-playfair text-3xl md:text-4xl font-bold text-forest-500 mb-4">
              What Our Members Say
            </h3>
            <div className="w-16 h-1 bg-gold-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-forest-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-gold-400 font-playfair font-bold">A</span>
                </div>
                <div>
                  <h4 className="font-inter font-semibold text-forest-500">Arjun Sharma</h4>
                  <p className="text-forest-400 text-sm">Legacy Member</p>
                </div>
              </div>
              <p className="text-forest-600 font-inter italic leading-relaxed">
                "The PICKNIK isn't just a club, it's a lifestyle. The attention to detail and member experience is unmatched."
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-forest-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-gold-400 font-playfair font-bold">P</span>
                </div>
                <div>
                  <h4 className="font-inter font-semibold text-forest-500">Priya Gupta</h4>
                  <p className="text-forest-400 text-sm">Enthusiast Member</p>
                </div>
              </div>
              <p className="text-forest-600 font-inter italic leading-relaxed">
                "Finally, a place where my family and I can enjoy quality time together. The community here is incredible."
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-forest-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-gold-400 font-playfair font-bold">R</span>
                </div>
                <div>
                  <h4 className="font-inter font-semibold text-forest-500">Raj Patel</h4>
                  <p className="text-forest-400 text-sm">Explorer Member</p>
                </div>
              </div>
              <p className="text-forest-600 font-inter italic leading-relaxed">
                "From my first visit, I knew this was special. The Explorer membership lets me enjoy this luxury regularly."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;