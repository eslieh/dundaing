// app/events/page.jsx
'use client';
import { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { FiFilter, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';

export default function EventListings() {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('trending');
  const [showSheng, setShowSheng] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data with Kenyan events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockEvents = [
        {
          id: 1,
          title: showSheng ? "Gengetone Bash" : "Urban Music Festival",
          date: "2023-12-15",
          time: "8:00 PM",
          venue: "KICC Rooftop, Nairobi",
          image: "/events/gengetone.jpg",
          price: 1500,
          category: "Music",
          mtaa: "CBD",
          harambee: true,
          transport: "Matatu 111"
        },
        {
          id: 2,
          title: showSheng ? "Tech Ting" : "Nairobi Tech Summit",
          date: "2023-11-30",
          time: "9:00 AM",
          venue: "Safari Park Hotel",
          image: "/events/tech.jpg",
          price: 5000,
          category: "Tech",
          mtaa: "Westlands",
          transport: "Matatu 106"
        },
        // Add 4 more Kenyan events...
      ];
      
      setEvents(mockEvents);
      setLoading(false);
    };

    fetchEvents();
  }, [showSheng]);

  // Filter by active tab
  const filteredEvents = events.filter(event => {
    if (activeTab === 'trending') return event.harambee;
    if (activeTab === 'mtaa') return event.mtaa === 'CBD'; // Would use real location
    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with culture toggle */}
      <header className="bg-orange-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {showSheng ? "Mambo Gani?" : "What's Happening?"}
          </h1>
          <button 
            onClick={() => setShowSheng(!showSheng)}
            className="bg-black text-orange-400 px-4 py-2 rounded-full text-sm"
          >
            {showSheng ? "SWITCH TO ENGLISH" : "TUMIA SENG"}
          </button>
        </div>
      </header>

      {/* Interactive tabs */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex overflow-x-auto gap-2 mb-6">
          {['trending', 'mtaa', 'music', 'tech', 'food'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {showSheng ? 
                tab === 'trending' ? 'Vibaya Sana' :
                tab === 'mtaa' ? 'Jijini' :
                tab === 'music' ? 'Dunda' : tab
               : 
                tab.charAt(0).toUpperCase() + tab.slice(1)
              }
            </button>
          ))}
        </div>

        {/* Unique filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <FilterButton icon={<FiFilter />} text={showSheng ? "Chagua" : "Filters"} />
          <FilterButton icon={<FiMapPin />} text={showSheng ? "Pahali" : "Location"} />
          <FilterButton icon={<FiUsers />} text={showSheng ? "Watu" : "People Going"} />
          <FilterButton icon={<FiClock />} text={showSheng ? "Muda" : "Time"} />
        </div>

        {/* Harambee ticket highlight */}
        {activeTab === 'trending' && (
          <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-6">
            <h3 className="font-bold text-orange-800">
              {showSheng ? "Piga Harambee" : "Group Tickets Available"}
            </h3>
            <p className="text-sm text-orange-700">
              {showSheng 
                ? "Pata tikiti kwa kushirikiana na marafiki" 
                : "Split ticket costs with friends"}
            </p>
          </div>
        )}

        {/* Events grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard 
                key={event.id}
                event={event}
                showSheng={showSheng}
              />
            ))}
          </div>
        )}
      </div>

      {/* Matatu info floating button */}
      <button className="fixed bottom-6 right-6 bg-orange-500 text-white p-3 rounded-full shadow-lg">
        <FiMapPin className="text-xl" />
        <span className="sr-only">Transport Info</span>
      </button>
    </div>
  );
}

// Components
function FilterButton({ icon, text }) {
  return (
    <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm">
      {icon}
      {text}
    </button>
  );
}

function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-48 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
        <div className="bg-gray-300 h-3 rounded w-1/2"></div>
        <div className="bg-gray-300 h-3 rounded w-full"></div>
      </div>
    </div>
  );
}