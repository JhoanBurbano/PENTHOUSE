'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 md:p-12 rounded-lg shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value.target.value })}
              placeholder="Enter your full name"
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value.target.value })}
              placeholder="Enter your email address"
              required
            />
            <TextArea
              label="Message"
              value={formData.message}
              onChange={(value) => setFormData({ ...formData, message: value })}
              maxLength={500}
              placeholder="Share your requirements or questions..."
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#9B7B4D] text-white py-3 rounded hover:bg-[#876B43] transition-colors shadow-md"
              type="submit"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFormSection;
