'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiMapPin, 
  FiClock, 
  FiCreditCard, 
  FiCheck,
  FiHeart,
  FiShare2
} from 'react-icons/fi';
import { FiTicket } from 'react-icons/fi';

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [liked, setLiked] = useState(false);

  const eventDetails = {
    title: "Blankets & Wine Nairobi",
    date: "June 15, 2025",
    time: "2:00 PM - 10:00 PM",
    location: "Ngong Racecourse, Nairobi",
    image: "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg"
  };

  const ticketTypes = [
    {
      id: 1,
      name: "General Admission",
      price: 2500,
      description: "Access to main event area",
      available: 120,
      perks: [
        "Entry to festival grounds",
        "Access to food vendors",
        "General seating area"
      ]
    },
    {
      id: 2,
      name: "VIP Experience",
      price: 7500,
      description: "Premium access with perks",
      available: 50,
      perks: [
        "Exclusive VIP lounge",
        "Premium bar access",
        "Fast track entry",
        "Complimentary drinks (3)"
      ]
    },
    {
      id: 3,
      name: "VVIP All-Inclusive",
      price: 15000,
      description: "Ultimate festival experience",
      available: 20,
      perks: [
        "Private viewing area",
        "Unlimited premium drinks",
        "Gourmet food buffet",
        "VIP parking",
        "Meet & greet with artists"
      ]
    }
  ];

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    setQuantity(1);
    setActiveTab('checkout');
  };

  const handleApplyPromo = () => {
    if (promoCode === 'MUSIC25') {
      setAppliedPromo(true);
    }
  };

  const handleCheckout = () => {
    setActiveTab('confirmation');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this event!',
        text: `I'm going to ${eventDetails.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const subtotal = selectedTicket ? selectedTicket.price * quantity : 0;
  const discount = appliedPromo ? subtotal * 0.25 : 0;
  const total = subtotal - discount;
  const serviceFee = Math.round(total * 0.05);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-gray-600 hover:text-orange-500">
              <FiArrowLeft className="mr-2" />
              Back to Event
            </button>
            <div className="text-xl font-bold text-orange-500">
              DUNDA<span className="text-gray-800">ING</span>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setLiked(!liked)}
                className={`p-2 ${liked ? 'text-red-500' : 'text-gray-600'}`}
              >
                <FiHeart />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-orange-500"
              >
                <FiShare2 />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Event Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
        >
          <div className="md:flex">
            <div className="md:w-1/3 h-48 md:h-auto relative">
              <img 
                src={eventDetails.image} 
                alt={eventDetails.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{eventDetails.title}</h1>
              
              <div className="flex items-center text-gray-600 mb-2">
                <FiCalendar className="mr-2 text-orange-500" />
                <span>{eventDetails.date}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <FiClock className="mr-2 text-orange-500" />
                <span>{eventDetails.time}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <FiMapPin className="mr-2 text-orange-500" />
                <span>{eventDetails.location}</span>
              </div>
              
              <div className="flex space-x-2">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  Music Festival
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Outdoor
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tickets/Checkout Flow */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('tickets')}
                className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                  activeTab === 'tickets'
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
               
              </button>
              <button
                onClick={() => setActiveTab('checkout')}
                className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                  activeTab === 'checkout'
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                disabled={!selectedTicket}
              >
                <div className="flex items-center">
                  <FiCreditCard className="mr-2" />
                  Checkout
                </div>
              </button>
            </nav>
          </div>

          {/* Tickets Selection */}
          {activeTab === 'tickets' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Available Tickets</h2>
              
              <div className="space-y-4">
                {ticketTypes.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    whileHover={{ scale: 1.02 }}
                    className="border border-gray-200 rounded-lg p-5 hover:border-orange-300 transition-all cursor-pointer"
                    onClick={() => handleTicketSelect(ticket)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{ticket.name}</h3>
                        <p className="text-gray-600 mb-3">{ticket.description}</p>
                        
                        <ul className="text-sm text-gray-600 space-y-1 mb-4">
                          {ticket.perks.map((perk, index) => (
                            <li key={index} className="flex items-center">
                              <FiCheck className="text-green-500 mr-2" size={14} />
                              {perk}
                            </li>
                          ))}
                        </ul>
                        
                        <span className="text-xs text-gray-500">
                          {ticket.available} tickets remaining
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-500">
                          KSh {ticket.price.toLocaleString()}
                        </div>
                        <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Select
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Checkout Form */}
          {activeTab === 'checkout' && selectedTicket && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {/* Ticket Summary */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Your Order</h2>
                  
                  <div className="bg-gray-50 rounded-lg p-5 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800">{selectedTicket.name}</h3>
                        <p className="text-gray-600 text-sm">{selectedTicket.description}</p>
                      </div>
                      <div className="text-orange-500 font-bold">
                        KSh {selectedTicket.price.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="quantity" className="text-gray-700 font-medium">
                        Quantity
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <label htmlFor="promo" className="block text-gray-700 font-medium mb-2">
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="promo"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={appliedPromo}
                        className={`px-4 py-2 rounded-r-lg font-medium ${
                          appliedPromo
                            ? 'bg-green-500 text-white'
                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                        }`}
                      >
                        {appliedPromo ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                    {appliedPromo && (
                      <p className="text-green-600 text-sm mt-1">25% discount applied!</p>
                    )}
                  </div>
                  
                  {/* Payment Method */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Payment Method</h3>
                    <div className="space-y-3">
                      <div className="flex items-center border border-gray-300 rounded-lg p-4">
                        <input
                          type="radio"
                          id="mpesa"
                          name="payment"
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                          defaultChecked
                        />
                        <label htmlFor="mpesa" className="ml-3 block text-gray-700">
                          <span className="font-medium">M-Pesa</span>
                          <span className="text-sm text-gray-500 block">Pay via M-Pesa</span>
                        </label>
                      </div>
                      <div className="flex items-center border border-gray-300 rounded-lg p-4">
                        <input
                          type="radio"
                          id="card"
                          name="payment"
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                        />
                        <label htmlFor="card" className="ml-3 block text-gray-700">
                          <span className="font-medium">Credit/Debit Card</span>
                          <span className="text-sm text-gray-500 block">Pay with Visa, Mastercard, etc.</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tickets ({quantity}x)</span>
                        <span>KSh {(selectedTicket.price * quantity).toLocaleString()}</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount (25%)</span>
                          <span>-KSh {discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Fee</span>
                        <span>KSh {serviceFee.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>KSh {(total + serviceFee).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                    >
                      Complete Purchase
                    </button>
                    
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      By completing your purchase, you agree to our Terms of Service
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Confirmation Screen */}
          {activeTab === 'confirmation' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6 text-center"
            >
              <div className="bg-green-100 text-green-800 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FiCheck size={40} />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Your tickets for {eventDetails.title} have been successfully purchased.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-5 max-w-md mx-auto mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">#EV2025-{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tickets:</span>
                  <span className="font-medium">
                    {quantity}x {selectedTicket.name}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                  <span>Total Paid:</span>
                  <span>KSh {(total + serviceFee).toLocaleString()}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Your e-tickets have been sent to your email. You can also view them in your account.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  View Tickets
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-3 rounded-lg font-medium transition-colors">
                  Back to Event
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}