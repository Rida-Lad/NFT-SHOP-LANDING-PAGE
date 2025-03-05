import React, { useState, useEffect, useRef } from 'react';
import { Users, Globe, Code, Palette, ArrowRight } from 'lucide-react';
import { motion, useSpring, useInView } from 'framer-motion';

const About = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const isInView = useInView(contentRef, { once: false, amount: 0.3 });

    // Reduced spring stiffness for less intense cursor animation
    const springConfig = { stiffness: 50, damping: 30 };
    const mouseX = useSpring(0, springConfig);
    const mouseY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Reduce movement intensity by dividing by a larger number
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(x * 0.5); // Reduced by 50%
            mouseY.set(y * 0.5); // Reduced by 50%
            setMousePosition({ x, y });
        };

        const container = containerRef.current;
        if (container) container.addEventListener('mousemove', handleMouseMove);
        return () => container?.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const features = [
        { icon: Globe, title: "Global Community", description: "Connect with artists worldwide", gradient: "from-orange-500 to-amber-600" },
        { icon: Code, title: "Innovative Tech", description: "Blockchain-powered security", gradient: "from-red-500 to-orange-600" },
        { icon: Palette, title: "Creative Freedom", description: "Tools built for artists", gradient: "from-amber-500 to-yellow-600" },
        { icon: Users, title: "Supportive Network", description: "Collaborate and grow together", gradient: "from-orange-600 to-red-600" }
    ];

    return (
        <motion.div
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Background with Viewport-Dependent Particle Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/10"
                            style={{
                                width: `${Math.random() * 80 + 40}px`,
                                height: `${Math.random() * 80 + 40}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            initial={{ scale: 1, opacity: 0 }}
                            animate={isInView ? {
                                scale: [1, 1.1, 1],
                                opacity: [0.2, 0.4, 0.2],
                            } : { scale: 1, opacity: 0 }}
                            transition={{
                                duration: Math.random() * 5 + 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                {/* Red Waves with Viewport Detection */}
                <svg className="absolute w-full h-full z-0" viewBox="0 0 1440 800">
                    <defs>
                        <linearGradient id="red-wave" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255, 0, 0, 0.1)" />
                            <stop offset="50%" stopColor="rgba(200, 0, 0, 0.15)" />
                            <stop offset="100%" stopColor="rgba(255, 50, 0, 0.1)" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Original Wave - Fixed to prevent black obstacle at bottom */}
                    <motion.path
                        d="M0,128L48,149.3C96,171,192,213,288,229.3C384,245,480,235,576,224C672,213,768,203,864,202.7C960,203,1056,213,1152,192C1248,171,1344,117,1392,90.7L1440,64L1440,320L0,320Z"
                        fill="url(#wave-gradient-1)"
                        filter="url(#glow)"
                        initial={{ opacity: 0 }}
                        animate={isInView ? {
                            y: [0, -10, 0],
                            opacity: 0.7
                        } : { opacity: 0 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* New Red Wave - Fixed to prevent black obstacle */}
                    <motion.path
                        d="M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,202.7C672,213,768,203,864,192C960,181,1056,160,1152,154.7C1248,149,1344,160,1392,165.3L1440,171L1440,320L0,320Z"
                        fill="url(#red-wave)"
                        filter="url(#glow)"
                        initial={{ opacity: 0 }}
                        animate={isInView ? {
                            y: [0, 8, 0],
                            opacity: 0.7
                        } : { opacity: 0 }}
                        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                    />
                </svg>
            </div>

            {/* Main Content with Viewport Detection */}
            <div
                ref={contentRef}
                className="container mx-auto px-4 z-10 min-h-screen flex flex-col items-center justify-center py-20"
            >
                <motion.div
                    className="text-center mb-12 relative"
                    initial={{ y: 50, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-500/20 blur-3xl rounded-full"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={isInView ? {
                            scale: [1, 1.03, 1],
                            opacity: 0.7
                        } : { opacity: 0 }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight" style={{ fontFamily: 'Fairplay Display, serif' }}>
                        <motion.span
                            className="inline-block bg-gradient-to-r from-orange-400 via-amber-500 to-red-500 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.03 }}
                        >
                            About Us
                        </motion.span>
                    </h1>


                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
                        We're revolutionizing digital art with cutting-edge technology and unparalleled creative freedom.
                    </p>
                </motion.div>

                {/* Features Grid with Viewport Detection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="relative group"
                            whileHover={{
                                y: -5, // Reduced from -10 to -5
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.div
                                className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-orange-500/30 shadow-2xl"
                                animate={isInView ? {
                                    y: -5, // Reduced from -10 to -5
                                    transition: { duration: 0.3, delay: index * 0.2 }
                                } : {}}
                            >
                                {/* Glow Effect - Less intense */}
                                <div className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-xl`}></div>

                                <div className="relative z-10 text-center">
                                    <motion.div
                                        className={`p-4 rounded-full bg-gradient-to-br ${feature.gradient} w-16 h-16 mx-auto shadow-xl`}
                                        whileHover={{ rotate: 180 }} // Reduced from 360 to 180
                                        transition={{ duration: 0.6 }} // Faster
                                    >
                                        <feature.icon className="text-white h-8 w-8" />
                                    </motion.div>

                                    <h3 className="text-xl font-bold mt-4 mb-2 text-white">{feature.title}</h3>
                                    <p className="text-sm text-gray-300">{feature.description}</p>
                                </div>

                                {/* Reduced Border Animation */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl"
                                    style={{
                                        background: `linear-gradient(45deg, transparent 50%, ${feature.gradient.split(' ')[1].replace('to-', '')} 50%)`,
                                        opacity: 0
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? {
                                        opacity: 0.3, // Reduced from 0.5
                                        rotate: 180, // Reduced from 360
                                    } : { opacity: 0 }}
                                    transition={{
                                        duration: 3, // Slower rotation
                                        repeat: Infinity,
                                        delay: index * 0.2
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button with Reduced Animation */}
                <motion.div
                    className="mt-12"
                    initial={{ y: 50, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <motion.button
                        className="relative group overflow-hidden rounded-full bg-gradient-to-r from-orange-600 to-red-600 px-8 py-4 text-white font-semibold shadow-xl"
                        whileHover={{ scale: 1.03 }} // Reduced from 1.05
                        whileTap={{ scale: 0.97 }} // Less dramatic
                    >
                        <motion.span
                            className="relative z-10 flex items-center gap-2"
                            animate={isInView ? { x: [0, 3, 0] } : {}} // Reduced movement from 5 to 3
                            transition={{ duration: 2, repeat: Infinity }} // Slowed down
                        >
                            Join the Revolution
                            <ArrowRight className="h-5 w-5" />
                        </motion.span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 0.2 }} // Reduced opacity from 0.3
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default About;