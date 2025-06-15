import React, { useEffect, useRef, useState } from 'react';
import { Trophy, Users, Clock, Star, Zap, Award, Target, Heart, Play, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OurCourtsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCourt, setActiveCourt] = useState(0);
  const [activeProgram, setActiveProgram] = useState('beginners');
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

  const courts = [
    {
      name: "Court Alpha",
      subtitle: "The Championship Arena",
      description: "Our flagship court featuring the finest ITF-certified surface with professional tournament lighting.",
      features: ["Tournament-grade lighting", "Premium viewing area", "Professional sound system", "Climate control"],
      image: "https://images.pexels.com/photos/8611100/pexels-photo-8611100.jpeg?auto=compress&cs=tinysrgb&w=800",
      capacity: "4 players + 20 spectators"
    },
    {
      name: "Court Beta",
      subtitle: "The Training Ground",
      description: "Designed for intensive coaching sessions with advanced ball machine integration.",
      features: ["Ball machine ready", "Video analysis setup", "Coaching platform", "Storage lockers"],
      image: "https://images.pexels.com/photos/8611353/pexels-photo-8611353.jpeg?auto=compress&cs=tinysrgb&w=800",
      capacity: "4 players + coaching area"
    },
    {
      name: "Court Gamma",
      subtitle: "The Family Court",
      description: "Perfect for family games and beginner-friendly sessions with softer lighting.",
      features: ["Family-friendly design", "Beginner markings", "Safety padding", "Kid-friendly nets"],
      image: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800",
      capacity: "6 players (family format)"
    },
    {
      name: "Court Delta",
      subtitle: "The Social Hub",
      description: "Adjacent to our café, perfect for casual games and social tournaments.",
      features: ["Café integration", "Social seating", "Event hosting", "Live streaming"],
      image: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800",
      capacity: "4 players + social area"
    }
  ];

  const programs = {
    beginners: {
      title: "First Steps",
      subtitle: "For the Curious Newcomer",
      description: "Gentle introduction to pickleball with focus on fun, fundamentals, and building confidence.",
      duration: "4 weeks • 2 sessions/week",
      groupSize: "6-8 players",
      includes: ["Equipment provided", "Fundamentals training", "Game rules", "Social play time"],
      price: "₹8,000",
      coach: {
        name: "Priya Sharma",
        bio: "Former state-level badminton player with 8 years of coaching experience",
        image: "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    },
    intermediate: {
      title: "Skill Builder",
      subtitle: "For the Developing Player",
      description: "Advanced techniques, strategy development, and competitive play preparation.",
      duration: "6 weeks • 3 sessions/week",
      groupSize: "4-6 players",
      includes: ["Advanced techniques", "Strategy sessions", "Match play", "Video analysis"],
      price: "₹15,000",
      coach: {
        name: "Arjun Patel",
        bio: "National pickleball champion with international coaching certifications",
        image: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    },
    advanced: {
      title: "Elite Training",
      subtitle: "For the Competitive Athlete",
      description: "Tournament preparation, advanced tactics, and performance optimization.",
      duration: "8 weeks • 4 sessions/week",
      groupSize: "2-4 players",
      includes: ["Tournament prep", "Mental coaching", "Fitness training", "1-on-1 sessions"],
      price: "₹25,000",
      coach: {
        name: "Rajesh Kumar",
        bio: "Former professional tennis player, now elite pickleball coach",
        image: "https://images.pexels.com/photos/8611100/pexels-photo-8611100.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    }
  };

  const specifications = [
    { label: "Surface Type", value: "ITF-Certified 10-Layer Professional" },
    { label: "Court Dimensions", value: "20' × 44' (Official Tournament Size)" },
    { label: "Net Height", value: "36\" at ends, 34\" at center" },
    { label: "Lighting", value: "LED Professional Tournament Grade" },
    { label: "Surface Material", value: "Cushioned Acrylic with Sand Texture" },
    { label: "Drainage", value: "Advanced Sub-Surface System" }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-forest-600 via-forest-500 to-forest-700">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="w-full h-full bg-[url('https://images.pexels.com/photos/8611100/pexels-photo-8611100.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-50"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className={`transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-cream-50 mb-8 leading-tight">
              Where Movement
            </h1>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-light text-gold-400 mb-12">
              Becomes Memory
            </h2>
            
            <div className="max-w-3xl mx-auto mb-16">
              <p className="text-cream-200 text-xl font-inter leading-relaxed opacity-90">
                Four ITF-certified courts where every serve tells a story, every rally builds relationships, 
                and every game becomes a cherished memory.
              </p>
            </div>

            {/* Play Button */}
            <button className="flex items-center space-x-3 bg-gold-400/20 backdrop-blur-sm border border-gold-400/30 rounded-full px-8 py-4 text-cream-100 hover:bg-gold-400/30 transition-all duration-300 mx-auto">
              <div className="w-12 h-12 rounded-full border-2 border-gold-400 flex items-center justify-center">
                <Play className="w-5 h-5 ml-1 text-gold-400" />
              </div>
              <span className="font-inter font-medium">Watch Court Tour</span>
            </button>
          </div>
        </div>
      </section>

      {/* Court Specifications */}
      <section ref={sectionRef} className="py-20 bg-forest-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-500 to-forest-700"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Championship Standards
            </h2>
            <p className="text-cream-100 text-xl max-w-3xl mx-auto font-inter">
              Every detail engineered for perfection, every surface crafted for champions.
            </p>
            <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full mt-6"></div>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {specifications.map((spec, index) => (
              <div key={index} className="bg-forest-400/30 backdrop-blur-sm rounded-2xl p-6 border border-cream-100/10">
                <h3 className="font-playfair text-xl font-semibold text-gold-400 mb-2">
                  {spec.label}
                </h3>
                <p className="text-cream-100 font-inter">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Courts */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-500 mb-6">
              Four Unique Experiences
            </h2>
            <p className="text-forest-600 text-xl max-w-3xl mx-auto font-inter">
              Each court designed with its own personality and purpose.
            </p>
          </div>

          {/* Court Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {courts.map((court, index) => (
              <button
                key={index}
                onClick={() => setActiveCourt(index)}
                className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                  activeCourt === index
                    ? 'bg-forest-500 text-cream-50 shadow-lg'
                    : 'bg-white text-forest-500 hover:bg-forest-50 border border-forest-200'
                }`}
              >
                {court.name}
              </button>
            ))}
          </div>

          {/* Active Court Display */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="relative">
                <img
                  src={courts[activeCourt].image}
                  alt={courts[activeCourt].name}
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-600/50 to-transparent rounded-3xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-forest-500 font-inter font-semibold">
                      {courts[activeCourt].capacity}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <h3 className="font-playfair text-4xl font-bold text-forest-500 mb-2">
                {courts[activeCourt].name}
              </h3>
              <p className="text-gold-600 font-playfair text-xl mb-6">
                {courts[activeCourt].subtitle}
              </p>
              <p className="text-forest-700 font-inter text-lg leading-relaxed mb-8">
                {courts[activeCourt].description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {courts[activeCourt].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gold-400 rounded-full flex-shrink-0"></div>
                    <span className="text-forest-600 font-inter">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="bg-forest-500 hover:bg-forest-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg">
                Book This Court
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Programs */}
      <section className="py-20 bg-forest-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Coaching Programs
            </h2>
            <p className="text-cream-100 text-xl max-w-3xl mx-auto font-inter">
              From first serve to championship play, we guide every step of your journey.
            </p>
            <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Program Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(programs).map(([key, program]) => (
              <button
                key={key}
                onClick={() => setActiveProgram(key)}
                className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                  activeProgram === key
                    ? 'bg-gold-400 text-forest-500 shadow-lg'
                    : 'bg-forest-400/50 text-cream-100 hover:bg-forest-400 border border-cream-100/20'
                }`}
              >
                {program.title}
              </button>
            ))}
          </div>

          {/* Active Program Display */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Program Details */}
            <div className="lg:col-span-2 bg-forest-400/30 backdrop-blur-sm rounded-3xl p-8 border border-cream-100/10">
              <h3 className="font-playfair text-3xl font-bold mb-2">
                {programs[activeProgram as keyof typeof programs].title}
              </h3>
              <p className="text-gold-400 font-playfair text-xl mb-6">
                {programs[activeProgram as keyof typeof programs].subtitle}
              </p>
              <p className="text-cream-100 font-inter text-lg leading-relaxed mb-8">
                {programs[activeProgram as keyof typeof programs].description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-inter font-semibold text-gold-400 mb-3">Program Details</h4>
                  <div className="space-y-2">
                    <p className="text-cream-100 font-inter">
                      <span className="text-gold-400">Duration:</span> {programs[activeProgram as keyof typeof programs].duration}
                    </p>
                    <p className="text-cream-100 font-inter">
                      <span className="text-gold-400">Group Size:</span> {programs[activeProgram as keyof typeof programs].groupSize}
                    </p>
                    <p className="text-cream-100 font-inter">
                      <span className="text-gold-400">Investment:</span> {programs[activeProgram as keyof typeof programs].price}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-inter font-semibold text-gold-400 mb-3">What's Included</h4>
                  <div className="space-y-2">
                    {programs[activeProgram as keyof typeof programs].includes.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gold-400 rounded-full"></div>
                        <span className="text-cream-100 font-inter text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button className="bg-gold-400 hover:bg-gold-500 text-forest-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg">
                Enroll Now
              </button>
            </div>

            {/* Coach Profile */}
            <div className="bg-cream-50 rounded-3xl p-8 text-forest-500">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src={programs[activeProgram as keyof typeof programs].coach.image}
                    alt={programs[activeProgram as keyof typeof programs].coach.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-playfair text-xl font-semibold mb-2">
                  {programs[activeProgram as keyof typeof programs].coach.name}
                </h4>
                <p className="text-forest-600 font-inter text-sm leading-relaxed">
                  {programs[activeProgram as keyof typeof programs].coach.bio}
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
            Ready to Play?
          </h3>
          <p className="font-inter text-xl md:text-2xl opacity-90 mb-12 leading-relaxed">
            Your perfect game awaits on courts designed for champions, 
            guided by coaches who believe in your potential.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-forest-500 hover:bg-forest-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl">
              Book Your Court
            </button>
            <button className="flex items-center space-x-2 text-forest-500 hover:text-forest-600 font-semibold">
              <span>Explore The Café</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurCourtsPage;