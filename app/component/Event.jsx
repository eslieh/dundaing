'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiMapPin, FiCalendar, FiSearch, FiFilter, FiX } from 'react-icons/fi';

const allEvents = [
  {
    id: 1,
    title: 'Nairobi Street Food Festival',
    date: 'May 12, 2025',
    location: 'KICC Grounds',
    image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg',
    category: 'Food',
    price: 'Free',
    type: 'Festival'
  },
  {
    id: 2,
    title: 'Blankets & Wine',
    date: 'May 19, 2025',
    location: 'Ngong Racecourse',
    image: 'https://images.pexels.com/photos/1586942/pexels-photo-1586942.jpeg',
    category: 'Music',
    price: 'KSh 2,500+',
    type: 'Concert'
  },
  {
    id: 3,
    title: 'TechFest Kenya',
    date: 'May 25, 2025',
    location: 'iHub Nairobi',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    category: 'Tech',
    price: 'KSh 1,000+',
    type: 'Conference'
  },
  {
    id: 4,
    title: 'Nairobi Marathon 2025',
    date: 'June 3, 2025',
    location: 'Uhuru Park',
    image: 'https://images.pexels.com/photos/1461743/pexels-photo-1461743.jpeg',
    category: 'Sports',
    price: 'KSh 3,000+',
    type: 'Sports'
  },
  {
    id: 5,
    title: 'Culture Expo Kenya',
    date: 'June 10, 2025',
    location: 'National Theatre',
    image: 'https://images.pexels.com/photos/1151891/pexels-photo-1151891.jpeg',
    category: 'Culture',
    price: 'KSh 500+',
    type: 'Exhibition'
  },
  {
    id: 6,
    title: 'Jazz Night Under the Stars',
    date: 'June 15, 2025',
    location: 'Nairobi Arboretum',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    category: 'Music',
    price: 'KSh 1,500+',
    type: 'Concert'
  }
];

const categories = ['All', 'Music', 'Food', 'Tech', 'Sports', 'Culture'];
const eventTypes = ['All', 'Concert', 'Festival', 'Conference', 'Sports', 'Exhibition'];
const priceRanges = ['All', 'Free', 'Under KSh 1,000', 'KSh 1,000-5,000', 'Over KSh 5,000'];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = allEvents
    .filter(event => selectedCategory === 'All' ? true : event.category === selectedCategory)
    .filter(event => selectedType === 'All' ? true : event.type === selectedType)
    .filter(event => {
      if (selectedPrice === 'All') return true;
      if (selectedPrice === 'Free') return event.price === 'Free';
      if (selectedPrice === 'Under KSh 1,000') return event.price !== 'Free' && parseInt(event.price.replace(/\D/g, '')) < 1000;
      if (selectedPrice === 'KSh 1,000-5,000') {
        const price = parseInt(event.price.replace(/\D/g, ''));
        return price >= 1000 && price <= 5000;
      }
      if (selectedPrice === 'Over KSh 5,000') {
        const price = parseInt(event.price.replace(/\D/g, ''));
        return price > 5000;
      }
      return true;
    })
    .filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedType('All');
    setSelectedPrice('All');
    setSearchTerm('');
  };

  return (
    <main className="px-4 py-8 sm:px-8 md:px-16 bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          Discover Nairobi's Best Events
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Find concerts, festivals, sports and more happening in the city
        </p>
      </motion.section>

      {/* Search and Filter Bar */}
      <div className="mb-8 sticky top-0 z-10 bg-gray-900 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
          </div>

          {/* Filter Button */}
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
            >
              <FiFilter className="text-orange-500" />
              <span>Filters</span>
            </button>

            {(selectedCategory !== 'All' || selectedType !== 'All' || selectedPrice !== 'All') && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
              >
                <FiX className="text-orange-500" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <motion.div 
            className="mt-4 p-6 bg-gray-800 rounded-xl shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange-500">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === cat
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange-500">Event Types</h3>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedType === type
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange-500">Price Range</h3>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map(price => (
                    <button
                      key={price}
                      onClick={() => setSelectedPrice(price)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedPrice === price
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {selectedCategory !== 'All' && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 text-sm">
            <span>{selectedCategory}</span>
            <button onClick={() => setSelectedCategory('All')} className="text-orange-500">
              <FiX size={14} />
            </button>
          </div>
        )}
        {selectedType !== 'All' && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 text-sm">
            <span>{selectedType}</span>
            <button onClick={() => setSelectedType('All')} className="text-orange-500">
              <FiX size={14} />
            </button>
          </div>
        )}
        {selectedPrice !== 'All' && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 text-sm">
            <span>{selectedPrice}</span>
            <button onClick={() => setSelectedPrice('All')} className="text-orange-500">
              <FiX size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="rounded-xl overflow-hidden shadow-lg bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="relative h-60 w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20" />
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                  {event.price}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <FiCalendar className="mr-2 text-orange-500" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <FiMapPin className="mr-2 text-orange-500" />
                  {event.location}
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300">
                    {event.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300">
                    {event.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="text-center py-16 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-xl mb-4">No events match your search criteria</p>
          <button
            onClick={resetFilters}
            className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            Reset Filters
          </button>
        </motion.div>
      )}

      {/* Load More */}
      {filteredEvents.length < allEvents.length && filteredEvents.length > 0 && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-medium"
          >
            Load More Events
          </button>
        </div>
      )}
    </main>
  );
}