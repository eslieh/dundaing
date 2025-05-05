'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiClock, FiCalendar, FiMapPin, FiShare2, FiHeart } from 'react-icons/fi';
import Image from 'next/image';

export default function ComingSoonPage() {
  const eventDate = new Date('2025-06-01T19:00:00'); // Set the event date
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;
      
      if (diff <= 0) {
        setIsLive(true);
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Subscribed email:', email);
    setSubscribed(true);
    setEmail('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Exciting Event Coming Soon!',
        text: 'Check out this upcoming event I found!',
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        {/* Header with social actions */}
        <motion.div 
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            EVENT<span className="text-white">HUB</span>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-full ${liked ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'} transition-colors`}
            >
              <FiHeart className="w-5 h-5" />
            </button>
            <button 
              onClick={handleShare}
              className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            >
              <FiShare2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Event title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              The Ultimate Experience
            </span>
          </motion.h1>

          {/* Countdown timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex justify-center items-center space-x-2 mb-4">
              <FiClock className="text-orange-400 w-6 h-6" />
              <span className="text-lg sm:text-xl text-gray-300">
                {isLive ? 'Event is live now!' : 'Starts in'}
              </span>
            </div>
            
            {!isLive && (
              <div className="flex justify-center space-x-2 sm:space-x-4">
                <div className="bg-gray-800 rounded-lg p-4 w-20 sm:w-24">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-400">{timeLeft.days}</div>
                  <div className="text-xs sm:text-sm text-gray-400">Days</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 w-20 sm:w-24">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-400">{timeLeft.hours}</div>
                  <div className="text-xs sm:text-sm text-gray-400">Hours</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 w-20 sm:w-24">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-400">{timeLeft.minutes}</div>
                  <div className="text-xs sm:text-sm text-gray-400">Minutes</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 w-20 sm:w-24">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-400">{timeLeft.seconds}</div>
                  <div className="text-xs sm:text-sm text-gray-400">Seconds</div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Event details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <FiCalendar className="text-orange-400 w-8 h-8 mb-2" />
                <h3 className="text-xl font-semibold mb-1">Event Date</h3>
                <p className="text-gray-300">June 1, 2025</p>
                <p className="text-gray-400 text-sm">7:00 PM - Midnight</p>
              </div>
              <div className="flex flex-col items-center">
                <FiMapPin className="text-orange-400 w-8 h-8 mb-2" />
                <h3 className="text-xl font-semibold mb-1">Location</h3>
                <p className="text-gray-300">Nairobi Convention Center</p>
                <p className="text-gray-400 text-sm">Kenyatta Avenue, Nairobi</p>
              </div>
            </div>
          </motion.div>

          {/* Event image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mb-12 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="relative w-full h-64 sm:h-80 md:h-96">
              <Image
                src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg"
                alt="Coming Soon Event"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            </div>
          </motion.div>

          {/* Event description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">About The Event</h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              Prepare for an unforgettable night of music, art, and culture at Nairobi's most anticipated event of the year. 
              Featuring world-class performers, immersive art installations, and gourmet food experiences, this is more than 
              just an event—it's a celebration of creativity and community.
            </p>
          </motion.div>

          {/* Subscribe form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg max-w-2xl mx-auto"
          >
            {subscribed ? (
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">Thank You!</h3>
                <p className="text-gray-300 mb-4">
                  You've been added to our list. We'll notify you when tickets go on sale!
                </p>
                <button 
                  onClick={() => setSubscribed(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg transition-colors"
                >
                  Subscribe Another Email
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-semibold mb-4">Get Early Access</h3>
                <p className="text-gray-300 mb-6">
                  Be the first to know when tickets are available and receive exclusive offers.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-orange-500/20"
                  >
                    Notify Me
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}