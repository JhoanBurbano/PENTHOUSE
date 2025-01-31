'use client';

import React from 'react';
import { motion } from 'framer-motion';

const VisionSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Elevating <span className="text-[#9B7B4D] font-medium">Luxury Living</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            At PENTHOUSE LUXURY, we redefine the art of elevated living. Our curated collection 
            of premium penthouses represents the pinnacle of sophisticated urban lifestyle, 
            where every detail is crafted to perfection.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
