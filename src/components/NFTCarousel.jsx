import React, { useState, useEffect, useRef } from 'react';
import svg1 from '../assets/svg1.svg';
import svg2 from '../assets/svg2.svg';
import svg3 from '../assets/svg3.svg';
import svg4 from '../assets/svg4.svg';
import svg5 from '../assets/svg5.svg';
import svg6 from '../assets/svg6.svg';
import svg7 from '../assets/svg7.svg';

const NFTCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

  // Array of NFT data
  const nfts = [
    { id: 1, image: svg1, name: "CryptoPunk #3429", price: "120.5 ETH", creator: "0xDead...beef" },
    { id: 2, image: svg2, name: "Bored Ape #8756", price: "98.2 ETH", creator: "0xF00d...cafe" },
    { id: 3, image: svg3, name: "Azuki #4532", price: "32.7 ETH", creator: "0xBabe...face" },
    { id: 4, image: svg4, name: "Doodle #9087", price: "15.3 ETH", creator: "0xC0de...0123" },
    { id: 5, image: svg5, name: "CloneX #2345", price: "45.8 ETH", creator: "0xAce1...7890" },
    { id: 6, image: svg6, name: "Moonbirds #6789", price: "28.6 ETH", creator: "0xB00b...1337" },
    { id: 7, image: svg7, name: "DeGods #1234", price: "52.9 ETH", creator: "0xD0ge...4200" },
  ];

  // Set number of visible NFTs based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  // Simple navigation functions with basic animation control
  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? nfts.length - visibleCount : newIndex;
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setStartIndex((prevIndex) => {
      const maxStartIndex = nfts.length - visibleCount;
      const newIndex = prevIndex + 1;
      return newIndex > maxStartIndex ? 0 : newIndex;
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  // Get the current visible NFTs
  const visibleNfts = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % nfts.length;
      result.push(nfts[index]);
    }
    return result;
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-black via-gray-900 to-red-950 flex flex-col items-center justify-center px-4">
      {/* Title Section */}
      <div className={`w-full max-w-6xl mb-12 md:mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-white mb-6 relative inline-block">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-500 animate-wave">
            Top NFT Collection
          </span>
          <span className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500"></span>
        </h2>
        <p className="font-['Poppins'] text-gray-400 max-w-2xl mx-auto text-sm md:text-base mt-4">
          Discover the most exclusive and valuable digital collectibles in the NFT space
        </p>
      </div>

      <div className="w-full max-w-6xl relative" ref={carouselRef}>
        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className={`absolute -left-4 sm:-left-6 md:-left-8 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-orange-500 p-2 sm:p-3 rounded-full hover:bg-red-900 transition-colors duration-300 focus:outline-none z-10 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
          style={{ transitionDelay: '250ms' }}
          disabled={isAnimating}
          aria-label="Previous NFT"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className={`absolute -right-4 sm:-right-6 md:-right-8 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-orange-500 p-2 sm:p-3 rounded-full hover:bg-red-900 transition-colors duration-300 focus:outline-none z-10 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          style={{ transitionDelay: '250ms' }}
          disabled={isAnimating}
          aria-label="Next NFT"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="relative">
          {/* NFT display area */}
          <div className="flex justify-center sm:justify-between gap-4 py-6 md:py-12">
            {visibleNfts().map((nft, idx) => (
              <div
                key={`${nft.id}-${startIndex}`}
                className={`${
                  visibleCount === 1 ? 'w-4/5' :
                  visibleCount === 2 ? 'w-1/2' : 'w-1/3'
                } flex flex-col transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-16'
                }`}
                style={{
                  transitionDelay: `${idx * 150}ms`,
                }}
              >
                <div className="bg-gradient-to-r from-red-800 via-orange-800 to-red-700 p-0.5 rounded-lg shadow-lg hover:shadow-red-500/20 h-full">
                  <div className="bg-black rounded-lg overflow-hidden flex flex-col h-full">
                    {/* SVG image with orange filter */}
                    <div className="w-full overflow-hidden">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-auto object-contain transition-transform duration-300 hover:scale-110"
                        style={{
                          filter: 'brightness(1.2) saturate(1.5) hue-rotate(-20deg)',
                        }}
                      />
                    </div>
                    {/* NFT info */}
                    <div className="p-4 md:p-5 lg:p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-center mb-3 md:mb-4">
                        <h3 className="text-orange-500 font-['Poppins'] font-bold text-sm md:text-lg">{nft.name}</h3>
                        <span className="text-red-400 font-['Poppins'] font-bold text-sm md:text-base">{nft.price}</span>
                      </div>
                      <div className="border-t border-gray-800 pt-3 mt-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-500 font-['Poppins'] text-xs">Creator</span>
                          <span className="text-orange-300 font-['Poppins'] text-xs font-mono">{nft.creator}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-['Poppins'] text-xs">Collection</span>
                          <span className="text-orange-300 font-['Poppins'] text-xs">Premium Series</span>
                        </div>
                      </div>
                      <button className="mt-4 w-full py-2 bg-gradient-to-r from-red-700 to-orange-600 text-white rounded font-['Poppins'] text-sm hover:from-red-600 hover:to-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Font imports */}
      <style jsx="true">{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};

export default NFTCarousel;