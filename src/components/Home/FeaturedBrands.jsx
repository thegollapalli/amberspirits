import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { brands } from '../../data/brands';

const FeaturedBrands = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % brands.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + brands.length) % brands.length);
    };

    return (
        <section className="py-24 bg-dark relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Our Finest Creations</h2>
                    <div className="w-24 h-1 mx-auto" style={{ backgroundColor: brands[currentIndex].color || '#d4af37' }}></div>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Carousel Content */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        {/* Image */}
                        <motion.div
                            key={`img-${currentIndex}`}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.5 }}
                            className="w-full md:w-1/2 flex justify-center"
                        >
                            <div className="relative w-64 h-96 md:w-80 md:h-[500px] bg-dark-elevated rounded-full flex items-center justify-center border border-white/5 shadow-2xl" style={{ shadowColor: brands[currentIndex].color }}>
                                <img
                                    src={brands[currentIndex].image}
                                    alt={brands[currentIndex].name}
                                    className="h-[90%] object-contain drop-shadow-2xl"
                                />
                            </div>
                        </motion.div>

                        {/* Text */}
                        <motion.div
                            key={`text-${currentIndex}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="w-full md:w-1/2 text-center md:text-left"
                        >
                            <h3 className="text-sm tracking-widest uppercase mb-2" style={{ color: brands[currentIndex].color }}>{brands[currentIndex].tagline}</h3>
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">{brands[currentIndex].name}</h2>
                            <p className="text-gray-400 text-lg mb-8">{brands[currentIndex].description}</p>
                            <Link
                                to="/collection"
                                className="px-8 py-3 bg-transparent border hover:text-dark transition-all duration-300 uppercase tracking-wider font-bold inline-block"
                                style={{
                                    borderColor: brands[currentIndex].color,
                                    color: brands[currentIndex].color,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = brands[currentIndex].color;
                                    e.currentTarget.style.color = '#0a0a0a';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = brands[currentIndex].color;
                                }}
                            >
                                Discover More
                            </Link>
                        </motion.div>
                    </div>

                    {/* Controls */}
                    <div className="absolute top-48 md:top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4 md:px-0">
                        <button
                            onClick={prevSlide}
                            className="pointer-events-auto w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all"
                        >
                            ←
                        </button>
                        <button
                            onClick={nextSlide}
                            className="pointer-events-auto w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all"
                        >
                            →
                        </button>
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center gap-3 mt-12">
                        {brands.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'w-8' : 'bg-white/20 hover:bg-white/50'}`}
                                style={{ backgroundColor: index === currentIndex ? brands[currentIndex].color : undefined }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBrands;
