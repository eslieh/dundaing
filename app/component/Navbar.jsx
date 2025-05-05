'use client'
import Link from "next/link";
import { Home, Search, User, Ticket, CalendarDays, MapPin, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEventDetails, setShowEventDetails] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { name: "Concert", active: true },
    { name: "Sport", active: false },
    { name: "Art", active: false },
    { name: "Java Jazz", active: false },
    { name: "Festival", active: false },
    { name: "Museum", active: false },
    { name: "Gallery", active: false }
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-3"
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className={`text-xl font-bold ${
              scrolled ? "text-orange-500" : "text-white"
            } flex items-center`}
          >
            <Ticket className="mr-2 w-5 h-5" />
            Dundaing
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setShowEventDetails(!showEventDetails)}
              className={`flex items-center ${
                scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-200"
              }`}
            >
              <CalendarDays className="mr-1 w-4 h-4" />
              Events
            </button>
            <Link 
              href="/venues" 
              className={`flex items-center ${
                scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-200"
              }`}
            >
              <MapPin className="mr-1 w-4 h-4" />
              Venues
            </Link>
            
            {/* Search bar */}
            <div className="relative mx-4">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                scrolled ? "text-gray-400" : "text-white"
              }`} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 ${
                  scrolled 
                    ? "bg-gray-100 text-gray-800 focus:ring-orange-500" 
                    : "bg-white/20 text-white placeholder-white/70 focus:ring-white"
                }`}
              />
            </div>

            <Link 
              href="/login" 
              className={`px-4 py-2 rounded-full ${
                scrolled 
                  ? "bg-orange-500 text-white hover:bg-orange-600" 
                  : "bg-white text-orange-500 hover:bg-white/90"
              } font-medium`}
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden" 
            onClick={() => setShowEventDetails(!showEventDetails)}
          >
            <svg className={`w-6 h-6 ${scrolled ? "text-gray-700" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      {/* Bottom Mobile Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 ${
        scrolled ? "bg-white" : "bg-white/20 backdrop-blur-md"
      } border-t border-gray-200 md:hidden z-40`}>
        <div className="flex justify-around py-2">
          <Link 
            href="/" 
            className={`flex flex-col items-center text-xs ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
          >
            <Home className="w-5 h-5" />
            Home
          </Link>
          <Link 
            href="/search" 
            className={`flex flex-col items-center text-xs ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
          >
            <Search className="w-5 h-5" />
            Search
          </Link>
          <Link 
            href="/tickets" 
            className={`flex flex-col items-center text-xs ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
          >
            <Ticket className="w-5 h-5" />
            Tickets
          </Link>
          <Link 
            href="/events" 
            className={`flex flex-col items-center text-xs ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            Events
          </Link>
          <Link 
            href="/profile" 
            className={`flex flex-col items-center text-xs ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
          >
            <User className="w-5 h-5" />
            Profile
          </Link>
        </div>
      </div>
      </nav>
    </>
  );
}