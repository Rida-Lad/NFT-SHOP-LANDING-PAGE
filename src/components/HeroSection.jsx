import React, { useState, useEffect } from 'react';
import logo from '../assets/logo-nft.png'; // Your logo
import '../index.css'; // Import your CSS file
import { ArrowRight, Flame, Zap, Star } from 'lucide-react';

const HeroSection = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    // Handle parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX / window.innerWidth - 0.5,
                y: e.clientY / window.innerHeight - 0.5,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Set loaded state after small delay for entrance animations
        const timer = setTimeout(() => setIsLoaded(true), 100);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timer);
        };
    }, []);

    return (
        <section
            className="relative flex flex-col items-center justify-center h-screen overflow-hidden"
            style={{
                minHeight: '100vh',
                background: 'radial-gradient(circle at center, rgb(30, 30, 30) 0%, rgb(0, 0, 0) 70%)'
            }}
        >
            {/* Animated background glow */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-orange-900/20 to-transparent"
                style={{
                    filter: 'blur(120px)',
                    transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
                    transition: 'transform 0.3s ease-out'
                }}
            ></div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 bg-grid-pattern opacity-30"
                style={{
                    backgroundSize: '50px 50px',
                    backgroundImage: 'linear-gradient(to right, rgb(60, 60, 60, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgb(60, 60, 60, 0.1) 1px, transparent 1px)'
                }}
            ></div>

            {/* Logo with animated reveal */}
            <div
                className={`relative mb-8 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-red-600 to-purple-700 blur-lg opacity-70"></div>
                <img
                    src={logo}
                    alt="NFT Store Logo"
                    className="relative w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-2 border-orange-500/50"
                />
            </div>

            {/* Main Content */}
            <div className="text-center max-w-4xl px-6 z-10">
                <h1
                    className={`text-5xl md:text-7xl font-bold mb-6 tracking-tight transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ fontFamily: "'Playfair Display', serif" }} // Apply the fancy font
                >
                    <span className="relative bg-gradient-to-r from-orange-400 to-white bg-clip-text text-transparent">
                        The Future of Art
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></span>
                    </span>
                </h1>

                <p
                    className={`text-xl md:text-2xl mb-8 font-light text-gray-300 transition-all duration-1000 delay-100 transform ${isLoaded ? 'translate-y-0 opacity-90' : 'translate-y-8 opacity-0'}`}
                >
                    Discover, collect, and trade unique digital assets in the world's most innovative NFT marketplace
                </p>

                <div
                    className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 delay-200 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                >
                    <button className="group w-full sm:w-auto bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-500 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl hover:shadow-orange-600/20 flex items-center justify-center">
                        <span>Explore Collection</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button className="group w-full sm:w-auto bg-transparent border-2 border-gray-700 hover:border-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 transform hover:scale-105 hover:bg-black/30 shadow-xl flex items-center justify-center">
                        <span>Create NFT</span>
                        <Flame className="ml-2 h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Stats Counter */}
                <div className={`flex justify-center mt-12 pt-6 border-t border-gray-800 transition-all duration-1000 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-80' : 'translate-y-8 opacity-0'}`}>
                    <div className="flex flex-wrap justify-center gap-8 text-center">
                        <div>
                            <div className="flex items-center justify-center mb-1">
                                <Zap className="text-orange-500 mr-1 h-4 w-4" />
                                <span className="text-2xl font-bold text-white">10K+</span>
                            </div>
                            <p className="text-sm text-gray-400">Artworks</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center mb-1">
                                <Star className="text-orange-500 mr-1 h-4 w-4" />
                                <span className="text-2xl font-bold text-white">8.5K+</span>
                            </div>
                            <p className="text-sm text-gray-400">Artists</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center mb-1">
                                <Flame className="text-orange-500 mr-1 h-4 w-4" />
                                <span className="text-2xl font-bold text-white">45K+</span>
                            </div>
                            <p className="text-sm text-gray-400">Collectors</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;