'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from '../molecules/PropertyCard';
import { Property } from '@/types/Property';
import { fadeIn, fadeInUp, staggerContainer } from '@/utils/animations';

interface PropertyListProps {
  properties: Property[];
  onViewDetails: (id: string) => void;
  loading: boolean;
  error: string | null;
}

// Sub-components
const PropertySkeleton = () => (
  <motion.div
    {...fadeInUp}
    className="h-full bg-gray-300 flex flex-col shadow-md rounded-xl overflow-hidden animate-pulse p-4"
  >
    <div className="h-64 w-full rounded-xl bg-gray-500"></div>
    <div className="p-4 flex flex-col gap-2">
      <div className="h-4 w-1/2 bg-gray-600 rounded-full"></div>
      <div className="h-4 w-1/4 bg-gray-500 rounded-full"></div>
      <div className="h-4 w-1/3 bg-gray-500 rounded-full"></div>
    </div>  
  </motion.div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <motion.div {...fadeInUp} className="text-center">
    <p className="text-lg font-semibold text-gray-700">{message}</p>
  </motion.div>
);

const EmptyMessage = () => (
  <motion.section {...fadeInUp} className="text-center">
    <p className="text-lg font-semibold text-gray-700">
      No properties found. Try adjusting your filters.
    </p>
  </motion.section>
);

const LoadingState = () => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="show"
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    {[...Array(3)].map((_, i) => (
      <PropertySkeleton key={i} />
    ))}
  </motion.div>
);

const PropertyGrid: React.FC<{ 
  properties: Property[]; 
  onViewDetails: (id: string) => void;
}> = ({ properties, onViewDetails }) => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="show"
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    <AnimatePresence mode="wait">
      {properties.map((property, index) => (
        <motion.div
          key={property.id + index}
          {...fadeInUp}
          transition={{ delay: index * 0.1 }}
        >
          <PropertyCard
            title={property.name}
            address={property.address.addressText}
            price={property.price}
            imageUrl={property.image}
            badgeText={property.year.toString()}
            onViewDetails={() => onViewDetails(property.id)}
            lenght={property.amenities.length}
            beds={property.amenities.beds}
            baths={property.amenities.baths}
            cardOwner={{
              id: property?.owner?.id,
              name: property?.owner?.name,
              address: property?.owner?.email_address,
              photo: property?.owner?.photo,
            }}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
);

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  onViewDetails,
  loading,
  error,
}) => {
  const renderContent = () => {
    if (error) return <ErrorMessage message={error} />;
    if (loading) return <LoadingState />;
    if (!properties?.length) return <EmptyMessage />;
    return <PropertyGrid properties={properties} onViewDetails={onViewDetails} />;
  };

  return (
    <motion.div
      {...fadeIn}
      className="w-full border border-gray-100 p-4 rounded-xl min-h-80"
    >
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </motion.div>
  );
};

export default PropertyList;