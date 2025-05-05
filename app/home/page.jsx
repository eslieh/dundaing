import EventCard from "@/app/component/EventCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50 pb-24">
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Discover Amazing Events</h1>
          <p className="text-lg mb-6">Concerts, tech meetups, comedy shows, and more near you</p>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for events, venues or artists..."
              className="w-full px-5 py-3 rounded-full text-black focus:outline-none focus:ring-4 focus:ring-white"
            />
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Upcoming Events</h2>
          <a href="/events" className="text-orange-500 hover:underline text-sm">View All</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <EventCard
              key={index}
              id={`event-${index}`}
              title={`Event ${index + 1}`}
              date="June 21, 2025"
              time="7:00 PM"
              venue="Nairobi Concert Hall"
              image="/sample.jpg"
              description="Experience unforgettable moments with music, food, and good vibes."
              price="KES 1,500"
            />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-16 px-4 text-center border-t">
        <div className="max-w-xl mx-auto">
          <h3 className="text-2xl font-bold mb-2">Host Your Own Event</h3>
          <p className="text-gray-600 mb-6">Get discovered by thousands and promote your event on Dundaing.</p>
          <a href="/host" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition">
            Host an Event
          </a>
        </div>
      </section>
    </div>
  );
}
