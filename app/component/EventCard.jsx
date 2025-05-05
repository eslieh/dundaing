// app/component/EventCard.jsx
import Image from "next/image";
import Link from "next/link";

export default function EventCard({
  id,
  title,
  date,
  time,
  venue,
  image,
  description,
  price,
}) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all overflow-hidden">
      <Image
        src={image}
        alt={title}
        width={600}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-gray-600 text-sm mb-2">
          {date} • {time}
        </p>
        <p className="text-gray-500 text-sm mb-2">{venue}</p>
        <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-blue-600">{price}</span>
          <Link
            href={`/events/${id}`}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Buy Ticket
          </Link>
        </div>
      </div>
    </div>
  );
}
