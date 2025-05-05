'use client'
import { useState } from 'react';
import { FiUser, FiLock, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login Data:', formData);
      // Call your login API here
    } else {
      console.log('Register Data:', formData);
      // Call your registration API here
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-500 to-orange-700 text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white text-gray-800 p-6 rounded-lg shadow-lg">
        {/* Toggle Between Login/Register */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-6"
        >
          {isLogin ? 'Login' : 'Create an Account'}
        </motion.h2>

        <form onSubmit={handleSubmit}>
          {/* Name Field (Only for Register) */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            type="submit"
            className="w-full py-3 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </motion.button>
        </form>

        {/* Switch Between Login and Register */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 hover:text-orange-600 ml-2 text-sm font-semibold"
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </div>
      </div>
    </main>
  );
}
