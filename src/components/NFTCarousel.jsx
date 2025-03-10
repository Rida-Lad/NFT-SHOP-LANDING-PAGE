import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, DollarSign, Zap } from 'lucide-react';

// Import SVGs as URLs
import svg1 from '../assets/svg1.svg';
import svg2 from '../assets/svg2.svg';
import svg3 from '../assets/svg3.svg';
import svg4 from '../assets/svg4.svg';
import svg5 from '../assets/svg5.svg';
import svg6 from '../assets/svg6.svg';
import svg7 from '../assets/svg7.svg';

const NFTCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Array of SVG URLs
  const svgUrls = [svg1, svg2, svg3, svg4, svg5, svg6, svg7];

  const nfts = [
    { id: 1, name: "Cosmic Void #238", price: 3.45, likes: 284, creator: "0xNebula", trending: true },
    { id: 2, name: "Cyber Punk Ape", price: 5.78, likes: 512, creator: "MetaLord", trending: true },
    { id: 3, name: "Abstract Mindset", price: 2.12, likes: 189, creator: "ArtificialDreamer", trending: false },
    { id: 4, name: "Ethereal Being", price: 8.92, likes: 743, creator: "0xGhost", trending: true },
    { id: 5, name: "Digital Genesis", price: 1.56, likes: 132, creator: "BlockchainArtist", trending: false },
    { id: 6, name: "Quantum Reality", price: 4.33, likes: 298, creator: "QuantumCreator", trending: false },
    { id: 7, name: "Neon Dystopia", price: 6.21, likes: 478, creator: "CyberNomad", trending: true },
  ];

  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % nfts.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoplay, nfts.length]);

  const nextSlide = () => {
    setIsAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % nfts.length);
  };

  const prevSlide = () => {
    setIsAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + nfts.length) % nfts.length);
  };

  const goToSlide = (index) => {
    setIsAutoplay(false);
    setCurrentIndex(index);
  };

  return (
    <div className="bg-black text-white h-screen flex flex-col">
      <div className="w-full max-w-5xl mx-auto px-4 py-6 flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Top NFT Collections
        </h1>
        <p className="text-gray-400 mb-4">Discover the most exclusive digital collectibles</p>
        
        {/* Main Carousel - takes up most of the space */}
        <div className="relative overflow-hidden rounded-xl bg-gray-900 shadow-lg flex-1">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Using regular image tag instead of SVG component */}
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={svgUrls[currentIndex]} 
                alt={nfts[currentIndex].name} 
                className="w-4/5 h-4/5 object-contain"
              />
            </div>
            
            {/* NFT Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {nfts[currentIndex].trending && (
                      <div className="bg-red-500 text-xs px-2 py-1 rounded-full flex items-center">
                        <Zap size={12} className="mr-1" />
                        Trending
                      </div>
                    )}
                    <div className="text-xs text-gray-400">Created by {nfts[currentIndex].creator}</div>
                  </div>
                  <h2 className="text-xl font-bold">{nfts[currentIndex].name}</h2>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center">
                      <DollarSign size={16} className="text-orange-400 mr-1" />
                      <span className="font-bold">{nfts[currentIndex].price} ETH</span>
                    </div>
                    <div className="flex items-center">
                      <Heart size={16} className="text-red-500 mr-1" />
                      <span>{nfts[currentIndex].likes}</span>
                    </div>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-lg font-medium hover:opacity-90 transition">
                  View
                </button>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Thumbnails */}
        <div className="flex justify-center mt-3 gap-2">
          {nfts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-gradient-to-r from-red-500 to-orange-500 w-4"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
        
        {/* NFT Thumbnails Preview - reduced height */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, index) => {
            const nftIndex = (currentIndex + index) % nfts.length;
            
            return (
              <div 
                key={index} 
                className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                onClick={() => goToSlide(nftIndex)}
              >
                <div className="aspect-square relative flex items-center justify-center p-2">
                  {/* Using regular image tag instead of SVG component */}
                  <img 
                    src={svgUrls[nftIndex]} 
                    alt={nfts[nftIndex].name} 
                    className="w-full h-full object-contain"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-2">
                    <div className="w-full">
                      <div className="flex justify-between items-center">
                        <div className="text-xs font-medium truncate">{nfts[nftIndex].name}</div>
                        <div className="text-xs text-orange-400">{nfts[nftIndex].price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NFTCarousel;