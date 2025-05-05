'use client';
import { useState, useEffect } from 'react';
import { FiHeart, FiMessageSquare, FiUsers, FiMapPin, FiCalendar } from 'react-icons/fi';
import { TbMusic, TbBasketball } from '@tabler/icons-react';

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState('forYou');
  const [events, setEvents] = useState([]);
  const [friendsActivity, setFriendsActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockEvents = [
        {
          id: 1,
          title: "CBD Night Run",
          type: "sports",
          date: "2023-12-10",
          time: "6:00 PM",
          location: "Uhuru Park",
          distance: "1.2km away",
          attendees: 47,
          friendsAttending: ["Juma", "Amina"],
          price: "Free"
        },
        {
          id: 2,
          title: "Gengetone Thursdays",
          type: "music",
          date: "2023-12-14",
          time: "9:00 PM",
          location: "K1 Clubhouse",
          distance: "3.5km away",
          attendees: 120,
          friendsAttending: ["Wanjiru"],
          price: "KES 800"
        },
      ];

      const mockFriendsActivity = [
        {
          id: 1,
          name: "Moses",
          action: "purchased",
          event: "Tech Safari",
          time: "2h ago",
          avatar: "/avatars/moses.jpg"
        },
        {
          id: 2,
          name: "Njeri",
          action: "saved",
          event: "Kite Festival",
          time: "5h ago",
          avatar: "/avatars/njeri.jpg"
        },
      ];

      setEvents(mockEvents);
      setFriendsActivity(mockFriendsActivity);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Tabs */}
      <div className="flex border-b mb-6">
        {['forYou', 'friends', 'saved'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize ${
              activeTab === tab
                ? 'border-b-2 border-orange-500 text-orange-600'
                : 'text-gray-500'
            }`}
          >
            {tab.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'forYou' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Events Near You</h2>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-4 h-32 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'friends' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Friends' Activity</h2>
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-4 h-20 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {friendsActivity.map((activity) => (
                <FriendActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Your Saved Events</h2>
          {/* Placeholder for saved events */}
        </div>
      )}

      {/* Floating Button */}
      <button className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center">
        <FiMapPin className="text-xl" />
      </button>
    </div>
  );
}

// Event Card
function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-3 rounded-full ${
            event.type === 'music' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
          }`}>
            {event.type === 'music' ? <TbMusic size={20} /> : <TbBasketball size={20} />}

          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{event.title}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FiCalendar size={14} /> {event.date}
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin size={14} /> {event.location}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex -space-x-2">
              {event.friendsAttending.map((friend, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium">
                  {friend.charAt(0)}
                </div>
              ))}
            </div>
            {event.friendsAttending.length > 0 && (
              <span className="text-gray-500">
                {event.friendsAttending.length > 1
                  ? `${event.friendsAttending[0]} + ${event.friendsAttending.length - 1} going`
                  : `${event.friendsAttending[0]} is going`}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              event.price === 'Free' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
            }`}>
              {event.price}
            </span>
            <button className="text-gray-400 hover:text-orange-500">
              <FiHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Friend Activity Card
function FriendActivityCard({ activity }) {
  return (
    <div className="bg-white rounded-lg p-4 flex items-start gap-3 border border-gray-100">
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
        {/* Replace with <Image src={activity.avatar} ... /> if using next/image */}
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium">{activity.name}</span> {activity.action} tickets for{' '}
          <span className="text-orange-500">{activity.event}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
      </div>
      <button className="text-gray-400 hover:text-orange-500">
        <FiMessageSquare />
      </button>
    </div>
  );
}
