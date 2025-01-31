import React from 'react';
import Image from 'next/image';
import { featuredProperty } from '../../constants/homeData';

interface PropertySpecs {
  spec: string;
}

const PropertySpec: React.FC<PropertySpecs> = ({ spec }) => (
  <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#9B7B4D] rounded-full"></span>
    {spec}
  </li>
);

const FeaturedProperty = () => {
  return (
    <section 
      className="w-full py-16 bg-white"
      aria-label="Featured Property"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-[#9B7B4D] mb-12 font-medium">
          Featured Luxury Property
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={featuredProperty.image}
              alt={`${featuredProperty.name} luxury property`}
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="text-gray-800">
            <h3 className="text-3xl md:text-4xl mb-4 font-medium">{featuredProperty.name}</h3>
            <p className="text-2xl text-[#9B7B4D] mb-4 font-medium">{featuredProperty.price}</p>
            <p className="text-gray-600 mb-6">{featuredProperty.description}</p>
            <ul className="space-y-3 text-gray-700">
              {featuredProperty.specs.map((spec, index) => (
                <PropertySpec key={index} spec={spec} />
              ))}
            </ul>
            <button className="mt-8 px-8 py-3 bg-[#9B7B4D] text-white rounded hover:bg-[#876B43] transition-colors shadow-md">
              Schedule Viewing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
