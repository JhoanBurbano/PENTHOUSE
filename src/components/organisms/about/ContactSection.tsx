'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 p-8 md:p-12 rounded-lg text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
            Ready to Experience <span className="text-[#9B7B4D] font-medium">Elevated Living?</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Let us guide you through our exclusive collection of premium penthouses.
            Schedule a private viewing with our elite team.
          </p>
          <button className="bg-[#9B7B4D] text-white px-8 py-3 rounded hover:bg-[#876B43] transition-colors shadow-md">
            Schedule Private Viewing
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
