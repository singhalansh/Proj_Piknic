import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, Calendar, Users } from 'lucide-react';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    visitType: 'general'
  });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      primary: 'Gomti Nagar, Lucknow',
      secondary: 'Near Phoenix Mall, UP 226010',
      action: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Phone',
      primary: '+91 9876543210',
      secondary: 'Mon-Sun: 6:00 AM - 11:00 PM',
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'hello@thepicknik.com',
      secondary: 'We respond within 2 hours',
      action: 'Send Email'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      primary: '+91 9876543210',
      secondary: 'Instant booking & queries',
      action: 'Chat Now'
    }
  ];

  const visitReasons = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'membership', label: 'Membership Information' },
    { value: 'event', label: 'Event Planning' },
    { value: 'corporate', label: 'Corporate Booking' },
    { value: 'tour', label: 'Schedule a Tour' }
  ];

  const operatingHours = [
    { day: 'Monday - Friday', hours: '6:00 AM - 11:00 PM' },
    { day: 'Saturday - Sunday', hours: '6:00 AM - 12:00 AM' },
    { day: 'Café Hours', hours: '7:00 AM - 10:00 PM' },
    { day: 'Pro Shop', hours: '8:00 AM - 9:00 PM' }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-forest-500 text-white relative overflow-hidden">
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
            Visit Us
          </h2>
          <p className="text-xl text-cream-100 max-w-3xl mx-auto font-inter leading-relaxed">
            Ready to experience The PICKNIK? We're here to welcome you and answer any questions 
            about your journey with us.
          </p>
          <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="bg-forest-400/30 backdrop-blur-sm rounded-2xl p-6 border border-cream-100/10 hover:bg-forest-400/40 transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gold-400 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-forest-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-playfair text-lg font-semibold mb-1">
                          {info.title}
                        </h3>
                        <p className="text-cream-100 font-inter font-medium mb-1">
                          {info.primary}
                        </p>
                        <p className="text-cream-200 font-inter text-sm mb-3">
                          {info.secondary}
                        </p>
                        <button className="text-gold-400 hover:text-gold-300 font-inter text-sm font-semibold transition-colors">
                          {info.action}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Operating Hours */}
            <div className="bg-forest-400/30 backdrop-blur-sm rounded-2xl p-8 border border-cream-100/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gold-400 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-forest-500" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold">Operating Hours</h3>
              </div>
              <div className="space-y-3">
                {operatingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-cream-100/10 last:border-b-0">
                    <span className="text-cream-100 font-inter">{schedule.day}</span>
                    <span className="text-gold-400 font-inter font-semibold">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-forest-400/30 backdrop-blur-sm rounded-2xl p-6 border border-cream-100/10">
              <div className="aspect-video bg-forest-400/50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                  <p className="text-cream-100 font-inter">Interactive Map</p>
                  <p className="text-cream-200 font-inter text-sm">Gomti Nagar, Lucknow</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="bg-cream-50 rounded-3xl p-8 text-forest-500">
              <div className="text-center mb-8">
                <h3 className="font-playfair text-3xl font-bold mb-2">
                  Get in Touch
                </h3>
                <p className="text-forest-600 font-inter">
                  Let us know how we can help create your perfect PICKNIK experience.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-forest-600 font-inter font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-forest-200 focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-forest-600 font-inter font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-forest-200 focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300"
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-forest-600 font-inter font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-forest-200 focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-forest-600 font-inter font-medium mb-2">
                    I'm interested in
                  </label>
                  <select
                    name="visitType"
                    value={formData.visitType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-forest-200 focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300"
                  >
                    {visitReasons.map((reason) => (
                      <option key={reason.value} value={reason.value}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-forest-600 font-inter font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-forest-200 focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your ideal PICKNIK experience..."
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-forest-500 hover:bg-forest-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gold-400 hover:bg-gold-500 text-forest-500 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-forest-400/30 backdrop-blur-sm rounded-2xl p-6 border border-cream-100/10 text-center">
                <Calendar className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                <h4 className="font-playfair text-lg font-semibold mb-2">Schedule a Tour</h4>
                <p className="text-cream-200 font-inter text-sm mb-4">
                  Experience our facilities firsthand
                </p>
                <button className="text-gold-400 hover:text-gold-300 font-inter font-semibold transition-colors">
                  Book Tour
                </button>
              </div>
              <div className="bg-forest-400/30 backdrop-blur-sm rounded-2xl p-6 border border-cream-100/10 text-center">
                <Users className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                <h4 className="font-playfair text-lg font-semibold mb-2">Group Events</h4>
                <p className="text-cream-200 font-inter text-sm mb-4">
                  Planning something special?
                </p>
                <button className="text-gold-400 hover:text-gold-300 font-inter font-semibold transition-colors">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gold-400 rounded-3xl p-8 md:p-12 text-forest-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-forest-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-forest-500/10 rounded-full translate-x-24 translate-y-24"></div>
            <div className="relative z-10">
              <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
                Your Journey Awaits
              </h3>
              <p className="font-inter text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
                Step into a world where every moment matters, every game inspires, 
                and every visit becomes a cherished memory.
              </p>
              <button className="bg-forest-500 hover:bg-forest-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl">
                Plan Your Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;