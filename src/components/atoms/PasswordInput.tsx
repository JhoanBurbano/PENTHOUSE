'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ViewIcon, ViewOffSlashIcon } from 'hugeicons-react';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const PasswordInput = ({ label, value, onChange, placeholder, required }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-6">
      <label htmlFor="password-input" className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id="password-input"
          type={showPassword ? 'text' : 'password'}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#9B7B4D] focus:border-transparent outline-none transition-all pr-12 text-xs md:text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showPassword ? <ViewOffSlashIcon size={20} /> : <ViewIcon size={20} />}
        </motion.button>
      </div>
    </div>
  );
};

export default PasswordInput;
