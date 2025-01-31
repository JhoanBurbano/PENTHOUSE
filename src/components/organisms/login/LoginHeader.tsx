'use client';

import React from 'react';
import { motion } from 'framer-motion';

const LoginHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
        Welcome to <span className="text-[#9B7B4D] font-medium">PENTHOUSE LUXURY</span>
      </h1>
      <p className="text-gray-600 text-lg">
        Access your exclusive seller portal to manage your luxury properties
      </p>
    </motion.div>
  );
};

export default LoginHeader;
