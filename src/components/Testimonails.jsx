import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'RUKIA KUCHIKI',
      role: 'NFT Collector',
      feedback:
        'The platform is amazing! I found rare NFTs that I couldn’t find anywhere else. Highly recommended!',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      name: 'ICHIGO KUROSAKI',
      role: 'Digital Artist',
      feedback:
        'Selling my art as NFTs has never been easier. The community is supportive, and the process is seamless.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      name: 'CHAE HAE IN',
      role: 'Investor',
      feedback:
        'I’ve made great returns on my NFT investments. The marketplace is trustworthy and easy to use.',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && !isHovered) {
      autoPlayRef.current = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % testimonials.length);
      }, 6000);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      clearInterval(autoPlayRef.current);
    };
  }, [isVisible, isHovered, testimonials.length]);

  return (
    <div
      ref={ref}
      className="h-screen w-full bg-gradient-to-br from-black via-gray-900 to-red-950 flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-particles">
          <div className="particle" style={{ left: '5%', top: '20%' }} />
          <div className="particle" style={{ left: '30%', top: '50%' }} />
          <div className="particle" style={{ left: '60%', top: '30%' }} />
          <div className="particle" style={{ left: '80%', top: '10%' }} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-white mb-6 relative inline-block">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-500 animate-wave">
            Testimonials
          </span>
          <span className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500"></span>
        </h2>
        <p className="font-['Poppins'] text-gray-400 max-w-2xl mx-auto text-sm md:text-base mt-4">
          Hear what our users have to say about their experience.
        </p>

        <div className="mt-12 relative">
          {/* Testimonial Card */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`transform transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            <div className="bg-gradient-to-r from-red-800 via-orange-800 to-red-700 p-0.5 rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300 relative">
              {/* Glowing border */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent animate-border-pulse"></div>
              <div className="bg-black rounded-lg p-6 md:p-8 flex flex-col items-center text-center relative">
                {/* Floating avatar glow */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent animate-avatar-glow"></div>
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full mb-4 relative z-10"
                />
                <h3 className="font-['Poppins'] text-xl md:text-2xl font-bold text-orange-500 mb-2">
                  {testimonials[activeTestimonial].name}
                </h3>
                <p className="font-['Poppins'] text-gray-500 text-sm mb-4">
                  {testimonials[activeTestimonial].role}
                </p>
                <p className="font-['Poppins'] text-gray-400 text-sm md:text-base">
                  "{testimonials[activeTestimonial].feedback}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
