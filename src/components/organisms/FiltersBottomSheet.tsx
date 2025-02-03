"use client";

import {
  ArrowUp01Icon,
  Cancel01Icon,
  MapPinIcon,
  SortingZA01Icon,
} from "hugeicons-react";
import React, { useState, useEffect } from "react";
import { Option, QuerySearchProperties } from "@/types/Filters";
import { cities, sortOptions, priceRanges } from "@/constants/filters";
import Button from "../atoms/Button";

interface FiltersBottomSheetProps {
  onApplyFilters?: (query?: QuerySearchProperties) => void;
}

function FiltersBottomSheet({ onApplyFilters }: FiltersBottomSheetProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [city, setCity] = useState<Option>();
  const [sort, setSort] = useState<Option>();
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>();

  // Handle body scroll lock
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [showFilters]);

  const toggleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleApplyFilters = () => {
    // Only include price range if both min and max are selected
    const filters = {
      city,
      sort,
      ...(priceRange?.min !== undefined && priceRange?.max !== undefined
        ? { priceRange }
        : {}),
    };

    /* interface QuerySearchProperties {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    sort?: string;
} */
    onApplyFilters?.({
      minPrice: filters.priceRange?.min,
      maxPrice: filters.priceRange?.max,
      city: filters.city?.value,
      sort: filters.sort?.value,
    });
    toggleShowFilters();
  };

  const handleResetFilters = () => {
    setCity(undefined);
    setSort(undefined);
    setPriceRange(undefined);
  };

  return (
    <>
      <button
        onClick={toggleShowFilters}
        className={`md:hidden fixed mx-auto bottom-0 left-1/2 -translate-x-1/2 z-30 bg-accent min-w-32 rounded-t-2xl p-2 pb-0 flex flex-col items-center justify-start transition-all duration-700 ${
          showFilters ? "opacity-0" : "opacity-100"
        }`}
        data-testid="Show filters"
      >
        <ArrowUp01Icon size={15} className="animate-bounce m-0 p-0" />
        <p className="text-xs font-bold p-0 m-0">Show filters</p>
      </button>
      <main
        className={`fixed md:hidden bottom-0 min-h-2/3 left-0 w-full bg-black/90 backdrop-blur z-30 rounded-t-3xl transition-transform duration-300 ease-in-out transform ${
          showFilters ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4 max-h-[85vh] overflow-y-auto relative font-serif overscroll-contain">
          <span className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mb-4 block" />
          <button
            onClick={toggleShowFilters}
            data-testid="Close menu"
            className="absolute top-1 right-1 z-[999] w-14 h-14 rounded-full flex items-center justify-center"
          >
            <Cancel01Icon size={20} className="text-white" />
          </button>
          <article className="flex flex-col gap-4 text-gray-50 pb-24">
            <header className="mb-2 sticky top-0 bg-black/90 backdrop-blur-sm py-2 -mt-2 -mx-4 px-4">
              <h1
                className="text-2xl font-bold uppercase text-center letter-spacing-sm"
                data-testid="Filters title"
              >
                Filters
              </h1>
              <hr className="my-3 opacity-20" />
            </header>

            {/* City Filter */}
            <section>
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3 text-gray-400">
                <MapPinIcon size={18} />
                Location
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {cities.map((cityOption) => (
                  <button
                    key={cityOption.value}
                    onClick={() =>
                      setCity(
                        city?.value === cityOption.value
                          ? undefined
                          : cityOption
                      )
                    }
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                      city?.value === cityOption.value
                        ? "bg-primary text-black"
                        : "bg-gray-800/50 hover:bg-gray-700"
                    }`}
                  >
                    {cityOption.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Price Range */}
            <section>
              <h2 className="text-sm font-semibold mb-3 text-gray-400 flex items-center justify-between">
                <span>Price Range</span>
                {priceRange && (
                  <span className="text-xs text-primary">
                    ${priceRange.min}M - ${priceRange.max}M
                  </span>
                )}
              </h2>
              <div className="grid grid-cols-4 gap-2">
                {priceRanges.steps.map((step) => {
                  const isMin = priceRange?.min === step;
                  const isMax = priceRange?.max === step;
                  const isInRange =
                    priceRange?.min !== undefined &&
                    priceRange?.max !== undefined &&
                    step > priceRange.min &&
                    step < priceRange.max;

                  return (
                    <button
                      key={step}
                      onClick={() => {
                        if (isMin) {
                          // If clicking min, reset the range
                          setPriceRange(undefined);
                        } else if (isMax) {
                          // If clicking max, only keep min
                          setPriceRange({
                            min: priceRange!.min,
                            max: priceRange!.min,
                          });
                        } else if (!priceRange?.min) {
                          // If no min set, set both min and max to this value
                          setPriceRange({ min: step, max: step });
                        } else if (step < priceRange.min) {
                          // If selecting a value lower than current min
                          setPriceRange({ min: step, max: priceRange.min });
                        } else {
                          // Set max value
                          setPriceRange({ min: priceRange.min, max: step });
                        }
                      }}
                      className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                        isMin
                          ? "bg-primary text-black"
                          : isMax
                          ? "bg-primary text-black"
                          : isInRange
                          ? "bg-primary/30 text-white"
                          : "bg-gray-800/50 hover:bg-gray-700"
                      }`}
                    >
                      ${step}M
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Sort Options */}
            <section>
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3 text-gray-400">
                <SortingZA01Icon size={18} />
                Sort By
              </h2>
              <div className="flex flex-col gap-1.5">
                {sortOptions.map((sortOption) => (
                  <button
                    key={sortOption.value}
                    onClick={() =>
                      setSort(
                        sort?.value === sortOption.value
                          ? undefined
                          : sortOption
                      )
                    }
                    className={`py-2 px-3 rounded-lg text-xs font-medium text-left transition-all ${
                      sort?.value === sortOption.value
                        ? "bg-primary text-black"
                        : "bg-gray-800/50 hover:bg-gray-700"
                    }`}
                  >
                    {sortOption.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Action Buttons */}
            <footer className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm p-4 flex flex-col gap-3">
              <Button
                variant="primary"
                onClick={handleApplyFilters}
                className="w-full text-[10px] uppercase tracking-widest font-bold py-3"
                label="Apply Filters"
              />
              <button
                onClick={handleResetFilters}
                className="text-gray-500 text-xs underline underline-offset-4 hover:text-primary transition-colors"
              >
                Reset all filters
              </button>
            </footer>
          </article>
        </div>
      </main>
    </>
  );
}

export default FiltersBottomSheet;
