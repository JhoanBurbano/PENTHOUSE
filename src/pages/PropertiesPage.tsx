"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchProperties,
} from "../redux/slices/propertiesSlice";
import FilterBar from "@/components/organisms/FiltersBar";
import Image from "next/image";
import PropertyList from "@/components/organisms/PropertyList";
import { QuerySearchProperties } from "@/types/Filters";
import PropertyDetails from "@/components/organisms/PropertyDetails";
import FiltersBottomSheet from "@/components/organisms/FiltersBottomSheet";
import { Property } from "@/types/Property";

const PropertiesPage = () => {
  const [open, setOpen] = React.useState(false);
  const [property, setProperty] = React.useState<Property | null>(null);

  const onClose = () => {
    setOpen(false);
    setProperty(null);
  };

  const onViewDetails = (id: string) => {
    setOpen(true);
    setProperty(properties.find((property) => property.id === id) || null);
  };

  useEffect(() => {
    if(property!==null){
      setOpen(true);
    }
  },[property])

  const dispatch = useDispatch<AppDispatch>();

  const { properties, loading, error } = useSelector(
    (state: RootState) => state.properties
  );

  const handleSearch = (query?: QuerySearchProperties) => {
    dispatch(fetchProperties(query));
  };

  useEffect(() => {
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto pt-[70px] sm:pt-[100px] flex flex-col gap-4"
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex flex-col justify-center items-center mb-24"
      >
        <motion.figure
          className={`relative w-full h-96 rounded-3xl overflow-hidden shadow-lg before:content-[""] before:absolute before:inset-0 before:bg-black/30 before:z-[5] after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-t after:to-transparent after:from-black/80 transition-all duration-500 ease-in-out`}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: {
              duration: 0.6,
              ease: "easeOut"
            }
          }}
        >
          <Image
            src="/hero_search.webp"
            alt="Hero Search"
            fill
            priority
            className="object-cover"
          />
          <motion.main
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: {
                delay: 0.3,
                duration: 0.5
              }
            }}
            className="absolute top-1/2 left-1/4 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <h1 className="text-4xl font-bold text-primary text-center uppercase">
              Find Your Next Home
            </h1>
          </motion.main>
        </motion.figure>

        <motion.span
          className={`flex flex-col gap-4 absolute bottom-0 w-[102%] sm:w-[105%] lg:w-2/3 translate-y-1/2 rounded-3xl shadow-deep border bg-black/5 border-white/10 backdrop-blur-sm z-10`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: "50%", 
            opacity: 1,
            transition: {
              delay: 0.5,
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }
          }}
        >
          <FilterBar onSearch={handleSearch} />
        </motion.span>
      </motion.section>

      <AnimatePresence mode="wait">
        <PropertyList
          properties={properties}
          onViewDetails={onViewDetails}
          loading={loading}
          error={error}
        />
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <PropertyDetails property={property} open={open} onClose={onClose} />
        )}
      </AnimatePresence>

      <FiltersBottomSheet onApplyFilters={handleSearch} />
    </motion.div>
  );
};

export default PropertiesPage;
