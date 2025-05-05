'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';

export default function OrderDetails() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill all required fields');
      return;
    }
    localStorage.setItem('orderDetails', JSON.stringify(formData));
    router.push('/order/payment');
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Your Information</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name */}
        <div>
          <div className="flex items-center mb-1">
            <FiUser className="mr-2 text-orange-500" />
            <label className="text-sm font-medium">First Name *</label>
          </div>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <div className="flex items-center mb-1">
            <FiUser className="mr-2 text-orange-500" />
            <label className="text-sm font-medium">Last Name *</label>
          </div>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300"
            required
          />
        </div>

        {/* Email */}
        <div>
          <div className="flex items-center mb-1">
            <FiMail className="mr-2 text-orange-500" />
            <label className="text-sm font-medium">Email Address *</label>
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300"
            required
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-1">
              <FiCalendar className="mr-2 text-orange-500" />
              <label className="text-sm font-medium">Date</label>
            </div>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300"
            />
          </div>

          <div>
            <div className="flex items-center mb-1">
              <FiClock className="mr-2 text-orange-500" />
              <label className="text-sm font-medium">Time</label>
            </div>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold flex items-center justify-center mt-8 hover:bg-orange-600"
        >
          Continue to Payment <FiArrowRight className="ml-2" />
        </button>
      </form>
    </div>
  );
}