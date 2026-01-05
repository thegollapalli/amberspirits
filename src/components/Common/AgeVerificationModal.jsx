import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AgeVerificationModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [birthYear, setBirthYear] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const isVerified = localStorage.getItem('isAgeVerified');
        if (!isVerified) {
            setIsVisible(true);
            // Prevent scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentYear = new Date().getFullYear();
        const year = parseInt(birthYear);

        if (isNaN(year) || birthYear.length !== 4) {
            setError('Please enter a valid 4-digit year.');
            return;
        }

        const age = currentYear - year;

        if (age < 21) {
            setError('You must be of legal drinking age to enter our site.');
            return;
        }

        // Success
        localStorage.setItem('isAgeVerified', 'true');
        setIsVisible(false);
        document.body.style.overflow = 'unset';
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        // Only allow numbers and max 4 digits
        if (/^\d{0,4}$/.test(value)) {
            setBirthYear(value);
            setError(''); // Clear error on typing
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                        className="w-full max-w-md bg-stone-900 border border-amber-900/30 rounded-2xl p-8 shadow-2xl shadow-amber-900/20 text-center relative overflow-hidden"
                    >
                        {/* Background decorative elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-amber-600 to-transparent opacity-50"></div>
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 tracking-wide">
                                Live Admirably. <br />
                                <span className="text-amber-500">Drink Responsibly.</span>
                            </h2>

                            <p className="text-stone-400 mb-8 text-sm md:text-base leading-relaxed">
                                You must be of legal drinking age in your country/state to enter our site.
                                <br />
                                <span className="text-amber-500/80 mt-1 block">Please enter your birth year.</span>
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative group">
                                    <label htmlFor="birthYear" className="block text-xs uppercase tracking-widest text-stone-500 mb-2 group-focus-within:text-amber-500 transition-colors">
                                        Year
                                    </label>
                                    <input
                                        type="text"
                                        id="birthYear"
                                        value={birthYear}
                                        onChange={handleInputChange}
                                        placeholder="----"
                                        className="w-full bg-stone-950/50 border border-stone-800 text-white text-center text-2xl tracking-[0.5em] py-4 rounded-xl focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/50 transition-all placeholder-stone-700"
                                        autoFocus
                                    />
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-sm font-medium"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-transparent border border-amber-700 text-white py-3 rounded-full font-medium tracking-wider hover:bg-amber-700 hover:text-white transition-all duration-300 uppercase text-sm group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Submit
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </span>
                                </button>
                            </form>

                            <div className="mt-8 text-[10px] text-stone-600 leading-tight max-w-xs mx-auto">
                                <p>
                                    Our site is meant for use by persons who are lawfully permitted to purchase and consume alcoholic beverages in the country from which they are accessing this site.
                                </p>
                                <p className="mt-2">
                                    By entering our site, you agree to the <a href="#" className="underline hover:text-stone-400">terms and conditions</a>, <a href="#" className="underline hover:text-stone-400">privacy policy</a> and other directives mentioned on the site. We use cookies to improve your browsing experience when using our site.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AgeVerificationModal;
