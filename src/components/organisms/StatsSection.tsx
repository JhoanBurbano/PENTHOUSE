import React from 'react';
import { statsData } from '../../constants/homeData';

interface StatItemProps {
  number: string;
  description: string;
}

const StatItem: React.FC<StatItemProps> = ({ number, description }) => (
  <div className="flex flex-col items-center p-4 text-center transform hover:scale-105 transition-transform duration-300">
    <span className="text-4xl md:text-5xl font-bold text-[#9B7B4D] mb-2">{number}</span>
    <p className="text-sm md:text-base text-gray-600">{description}</p>
  </div>
);

const StatsSection = () => {
  return (
    <section 
      className="w-full py-16 bg-gray-50"
      aria-label="Real Estate Statistics"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-gray-800 mb-12 font-light">
          Discover the World <br/>
          <span className="text-[#9B7B4D] font-medium">of Premium Real Estate</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, index) => (
            <StatItem
              key={index}
              number={stat.number}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
