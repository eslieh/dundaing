'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiCheckCircle, FiMail, FiCalendar, FiMapPin, FiDownload, FiHome } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function OrderSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Check if payment was successful
    const paymentSuccess = sessionStorage.getItem('paymentSuccess');
    if (!paymentSuccess) {
      router.push('/');
    }
    // Clear payment flag
    return () => sessionStorage.removeItem('paymentSuccess');
  }, [router]);

  // Mock booking data
  const booking = {
    event: "Nairobi Night Jam",
    date: "June 21, 2025",
    time: "8:00 PM",
    venue: "KICC Rooftop, Nairobi",
    tickets: 2,
    total: 5830,
    bookingId: "DND-2025-8765"
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 text-center">
      <div className="mb-8 flex justify-center">
        <div className="bg-green-100 p-4 rounded-full">
          <FiCheckCircle className="text-green-500 text-5xl" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
      <p className="text-lg text-gray-600 mb-8">
        We've sent your booking details to your email. Bring your excitement and we'll handle the rest!
      </p>

      <div className="bg-orange-50 rounded-xl p-6 mb-8 text-left">
        <h2 className="font-bold text-lg mb-4">Booking Details</h2>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <FiMail className="text-orange-500 mr-3" />
            <span>Booking ID: <strong>{booking.bookingId}</strong></span>
          </div>
          
          <div className="flex items-center">
            <FiCalendar className="text-orange-500 mr-3" />
            <span>{booking.date} at {booking.time}</span>
          </div>
          
          <div className="flex items-center">
            <FiMapPin className="text-orange-500 mr-3" />
            <span>{booking.venue}</span>
          </div>
          
          <div className="pt-4 border-t">
            <p className="font-medium">{booking.tickets} {booking.tickets > 1 ? 'Tickets' : 'Ticket'}</p>
            <p className="text-2xl font-bold text-orange-600">KES {booking.total.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button className="flex-1 bg-white border border-orange-500 text-orange-500 py-3 rounded-lg font-medium flex items-center justify-center">
          <FiDownload className="mr-2" /> Download Tickets
        </button>
        <button className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium flex items-center justify-center">
          <FaWhatsapp className="mr-2 text-lg" /> Share via WhatsApp
        </button>
      </div>

      <button 
        onClick={() => router.push('/')}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 flex items-center justify-center"
      >
        <FiHome className="mr-2" /> Back to Home
      </button>
    </div>
  );
}