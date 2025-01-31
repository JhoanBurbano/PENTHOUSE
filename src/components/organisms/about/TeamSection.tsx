'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TeamMemberProps {
  name: string;
  position: string;
  image: string;
  delay: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, position, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="text-center"
  >
    <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover hover:scale-110 transition-transform duration-300"
      />
    </div>
    <h3 className="text-xl font-medium text-gray-800 mb-1">{name}</h3>
    <p className="text-[#9B7B4D]">{position}</p>
  </motion.div>
);

const TeamSection = () => {
  const team = [
    {
      name: "Victoria Sterling",
      position: "Luxury Penthouse Specialist",
      image: "/specialist1.webp",
      delay: 0.2
    },
    {
      name: "James Harrison",
      position: "Premium Portfolio Director",
      image: "/director1.webp",
      delay: 0.4
    },
    {
      name: "James Harrison",
      position: "Elite Client Relations",
      image: "/manager1.webp",
      delay: 0.6
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
            Meet Our <span className="text-[#9B7B4D] font-medium">Elite Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our distinguished professionals bring unparalleled expertise in luxury penthouses,
            ensuring you receive exceptional service in your journey to finding the perfect elevated home.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
