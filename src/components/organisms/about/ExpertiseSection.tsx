'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ExpertiseCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ title, description, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
  >
    <div className="w-12 h-12 mb-4 relative">
      <Image
        src={icon}
        alt={title}
        fill
        className="object-contain"
      />
    </div>
    <h3 className="text-xl font-medium text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const ExpertiseSection = () => {
  const expertises = [
    {
      title: "Premium Penthouses",
      description: "We showcase an exclusive collection of the world's most prestigious penthouses, each offering unparalleled views and luxury amenities.",
      icon: "/icons/penthouse.svg",
      delay: 0.2
    },
    {
      title: "Bespoke Service",
      description: "Our elite team provides personalized attention and white-glove service to ensure your journey to finding the perfect penthouse is seamless.",
      icon: "/icons/service.svg",
      delay: 0.4
    },
    {
      title: "Prime Locations",
      description: "Access to penthouses in the most coveted addresses worldwide, from iconic city skylines to beachfront destinations.",
      icon: "/icons/location.svg",
      delay: 0.6
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl text-center font-light text-gray-800 mb-12"
        >
          Our <span className="text-[#9B7B4D] font-medium">Expertise</span>
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {expertises.map((expertise, index) => (
            <ExpertiseCard key={index} {...expertise} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
