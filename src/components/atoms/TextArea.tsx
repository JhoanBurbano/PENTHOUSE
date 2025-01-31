'use client';

import React from 'react';

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  placeholder?: string;
}

const TextArea = ({ label, value, onChange, maxLength, placeholder }: TextAreaProps) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <textarea
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#9B7B4D] focus:border-transparent outline-none transition-all resize-none"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          {value.length}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default TextArea;
