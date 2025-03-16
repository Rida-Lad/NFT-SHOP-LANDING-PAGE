import React, { useEffect, useState, useRef } from 'react';
import { FaEye, FaWallet, FaExchangeAlt } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: FaEye,
      title: 'Browse NFTs',
      description: 'Explore a vast collection of unique digital assets. Find the perfect NFT that matches your style and taste.',
      variant: 'red'
    },
    {
      id: 2,
      icon: FaWallet,
      title: 'Buy & Own',
      description: 'Securely purchase your favorite NFTs using cryptocurrency. Own your digital assets and access exclusive perks.',
      variant: 'purple'
    },
    {
      id: 3,
      icon: FaExchangeAlt,
      title: 'Resell',
      description: 'List your NFTs on the marketplace and trade them with other collectors. Earn profits from your investments.',
      variant: 'cyan'
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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

  return (
    <div
      ref={ref}
      className="min-h-screen w-full bg-black flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* MOBILE TOP SPACING ADJUSTMENT */}
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-white mb-6 relative inline-block mt-16 md:mt-0">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-500 animate-wave">
            How It Works
          </span>
          <span className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500 animate-underline"></span>
        </h2>
        <p className="font-['Poppins'] text-gray-400 max-w-2xl mx-auto text-sm md:text-base mt-4">
          A simple 3-step process to explore, own, and trade NFTs.
        </p>

        {/* MOBILE BOTTOM SPACING ADJUSTMENT */}
        <div className="mt-12 mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`transform transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className={`p-0.5 rounded-lg shadow-lg hover:shadow-${step.variant}-500/50 transition-all duration-300 hover:scale-105 ${
                step.variant === 'red' ? 'bg-gradient-to-r from-red-600 to-orange-500' :
                step.variant === 'purple' ? 'bg-gradient-to-r from-purple-600 to-indigo-500' :
                step.variant === 'cyan' ? 'bg-gradient-to-r from-cyan-600 to-blue-500' : ''
              }`}>
                <div className="bg-black rounded-lg p-6 md:p-8 flex flex-col items-center text-center h-full min-h-[300px] relative overflow-hidden">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-20 animate-shimmer"></div>
                  
                  <div className="flex-1 flex items-center justify-center mb-6 relative z-10">
                    <step.icon 
                      className={`text-4xl md:text-5xl transition-all duration-300 ${
                        step.variant === 'red' ? 'text-red-500 hover:text-red-400' : 
                        step.variant === 'purple' ? 'text-purple-500 hover:text-purple-400' : 
                        step.variant === 'cyan' ? 'text-cyan-500 hover:text-cyan-400' : ''
                      }`}
                    />
                  </div>
                  <h3 className="font-['Poppins'] text-xl md:text-2xl font-bold text-orange-500 mb-4 transition-all duration-300 hover:text-white">
                    {step.title}
                  </h3>
                  <p className="font-['Poppins'] text-gray-400 text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;