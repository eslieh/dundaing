'use client'
import { FiMapPin, FiCalendar, FiStar, FiArrowRight, FiFilter } from 'react-icons/fi';
import Image from 'next/image';

export default function EventsPage() {
  const popularEvents = [
    {
      name: "Maylene and the Sons of Disaster Islander",
      venue: "Carnivore Grounds, Nairobi",
      price: "From KES 2,500",
      image: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg"
    },
    {
      name: "Dr. MacLeo",
      venue: "KICC Auditorium",
      price: "From KES 3,000",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
    },
    {
      name: "Shannon King Clements",
      venue: "Alliance Française",
      price: "From KES 1,800",
      image: "https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg"
    },
    {
      name: "Bradle",
      venue: "The Alchemist Bar",
      price: "From KES 1,200",
      image: "https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg"
    },
    {
      name: "Mark Smith Stand-up",
      venue: "Nairobi Comedy Club",
      price: "From KES 1,500",
      image: "https://images.pexels.com/photos/167475/pexels-photo-167475.jpeg"
    },
    {
      name: "Cunney Special Show",
      venue: "Uhuru Gardens",
      price: "From KES 2,000",
      image: "https://images.pexels.com/photos/1763068/pexels-photo-1763068.jpeg"
    }
  ];

  const featuredEvents = [
    {
      title: "RSL Arousing Tour 2024",
      venue: "Search Help Channel, Night York",
      date: "May 15, 2025",
      description: "Experience the electrifying performance of RSL on their nationwide tour.",
      image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
      price: "KES 3,500"
    },
    {
      title: "Afro Fusion Night",
      venue: "KICC Rooftop, Nairobi",
      date: "June 2, 2025",
      description: "A night of African rhythms blended with contemporary beats.",
      image: "https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg",
      price: "KES 2,800"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
      {/* Location Filter */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900">Events in</h1>
        <div className="flex gap-3">
          <select className="border rounded-lg px-3 py-2 bg-white shadow-sm">
            <option>Nairobi</option>
            <option>Mombasa</option>
            <option>Kisumu</option>
            <option>Nakuru</option>
          </select>
          <button className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white shadow-sm hover:bg-gray-100">
            <FiFilter /> Filters
          </button>
        </div>
      </div>

      {/* Featured Events */}
      <div className="space-y-12">
        {featuredEvents.map((event, index) => (
          <div key={index} className="border-b pb-10 last:border-b-0">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="relative h-56 w-full rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-orange-400">{index + 1}.</span>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <FiMapPin className="mr-1" /> {event.venue}
                      </span>
                      <span className="flex items-center">
                        <FiCalendar className="mr-1" /> {event.date}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-orange-600">{event.price}</span>
                      <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                        Get Tickets <FiArrowRight className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popular Events Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
          <FiStar className="mr-2 text-yellow-500" /> Popular Events
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularEvents.map((event, index) => (
            <div key={index} className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="relative h-40">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{event.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{event.venue}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-600">{event.price}</span>
                  <button className="text-sm text-orange-500 hover:underline">
                    See dates
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-20 bg-orange-100 rounded-xl p-8 text-center shadow-md">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">Can't find what you're looking for?</h3>
        <p className="text-gray-700 mb-4">Try our advanced search or browse by category</p>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
          Explore All Events
        </button>
      </div>
    </div>
  );
}
