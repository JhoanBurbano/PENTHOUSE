'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import PasswordInput from '@/components/atoms/PasswordInput';
import { LockIcon } from 'hugeicons-react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-md w-full"
    >
      <div className="flex justify-center mb-8">
        <div className="w-12 h-12 bg-[#9B7B4D] bg-opacity-10 rounded-full flex items-center justify-center">
          <LockIcon className="text-[#9B7B4D] text-2xl" />
        </div>
      </div>

      <h2 className="text-2xl font-light text-center text-gray-800 mb-8">
        Seller <span className="text-[#9B7B4D] font-medium">Portal</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value.target.value })}
          placeholder="Enter your email"
          required
        />

        <PasswordInput
          label="Password"
          value={formData.password}
          onChange={(value) => setFormData({ ...formData, password: value })}
          placeholder="Enter your password"
          required
        />

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-[#9B7B4D]" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-sm text-[#9B7B4D] hover:text-[#876B43] transition-colors">
            Forgot Password?
          </a>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#9B7B4D] text-white py-3 rounded-lg hover:bg-[#876B43] transition-colors shadow-md"
          type="submit"
        >
          Sign In
        </motion.button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Need assistance?{' '}
        <a href="/contact" className="text-[#9B7B4D] hover:text-[#876B43] transition-colors">
          Contact Support
        </a>
      </p>
    </motion.div>
  );
};

export default LoginForm;
