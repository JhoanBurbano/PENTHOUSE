'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ContactHeader = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Connect with <span className="text-[#9B7B4D] font-medium">Luxury</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Ready to discover your perfect penthouse? Our luxury specialists are here to guide 
            you through our exclusive collection of premium properties. Share your vision, 
            and let us make it a reality.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHeader;
