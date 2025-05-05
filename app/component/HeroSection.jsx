'use client';

import { useState } from 'react';
import { FiSearch, FiMapPin, FiCalendar, FiArrowRight, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'All', icon: '🌟' },
    { name: 'Music', icon: '🎵' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Tech', icon: '💻' },
    { name: 'Food', icon: '🍴' },
    { name: 'Culture', icon: '👑' },
  ];

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Nightpool.jpeg" // Make sure this is in the public folder
          alt="Nairobi Nightlife"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Animated Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6"
          >
            <span className="text-orange-400">Dunda</span> Your Weekend in{' '}
            <span className="inline-block">
              Nairobi
              <motion.span
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block ml-2"
                role="img"
                aria-label="Kenya flag"
              >
                🇰🇪
              </motion.span>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto mb-10"
          >
            Discover the hottest events, concerts, and experiences in Kenya's capital
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="relative flex items-center">
              <FiSearch className="absolute left-4 text-gray-400 text-xl" />
              <input
                type="text"
                aria-label="Search events"
                placeholder="Search concerts, parties, sports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-full bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder:text-gray-500 text-sm sm:text-base"
              />
              <button
                aria-label="Submit Search"
                className="absolute right-2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                <FiArrowRight className="text-xl" />
              </button>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center px-4 py-2 rounded-full transition-all transform hover:scale-105 duration-200 ${
                  activeCategory === category.name
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                aria-label={`Filter by ${category.name}`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Location/Date Quick Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-4 text-sm"
          >
            <button
              className="flex items-center text-white bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-black/40 transition-colors"
              aria-label="Filter by Nairobi CBD"
            >
              <FiMapPin className="mr-2 text-orange-400" />
              Nairobi CBD
            </button>
            <button
              className="flex items-center text-white bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-black/40 transition-colors"
              aria-label="Filter by This Weekend"
            >
              <FiCalendar className="mr-2 text-orange-400" />
              This Weekend
            </button>
            <button
              className="flex items-center text-white bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-black/40 transition-colors"
              aria-label="Filter by Friends Going"
            >
              <FiUsers className="mr-2 text-orange-400" />
              Friends Going
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Scrolling Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-1">Explore Events</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
