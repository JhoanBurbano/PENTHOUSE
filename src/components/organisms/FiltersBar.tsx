"use client";
import React, { useState, useEffect, useCallback } from "react";
import PriceRange from "../atoms/PriceRange";
import SearchBar from "../atoms/SearchBar";
import Selector from "../atoms/Selector";
import { Option, QuerySearchProperties } from "@/types/Filters";
import SelectAreaMap from "../molecules/SelectAreaMap";

interface FilterBarProps {
  onSearch: (query?: QuerySearchProperties) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [isTyping, setIsTyping] = useState(false);
  const [city, setCity] = useState<Option>();
  const [sort, setSort] = useState<Option>();



  const debounce = useCallback((func: () => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, delay);
    };
  }, []);

  const handleSelectRange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleSearch = debounce(() => {
    onSearch({
      name,
      minPrice: minPrice,
      maxPrice: maxPrice,
      city: city?.value as string,
      sort: sort?.value as string,
    });
    setIsTyping(false);
  }, 500);

  useEffect(() => {
    if (isTyping) {
      console.log(name, minPrice, maxPrice, isTyping, city, sort);
      handleSearch();
    }
  }, [name, minPrice, maxPrice, isTyping, city, sort, handleSearch]);

  return (
    <>
      <section className="w-full py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
            role="search"
          >
            <SearchBar
              name={name}
              setName={setName}
              setIsTyping={setIsTyping}
            />

            <div className="grid-cols-4 gap-2 hidden md:grid">
              <PriceRange
                minPrice={5}
                maxPrice={20}
                onSelectRange={handleSelectRange}
              />
              <Selector
                label="City"
                value={city}
                setValue={setCity}
                options={[
                  {
                    value: "5",
                    label: "Dubai",
                  },
                  {
                    value: "10",
                    label: "Abu Dhabi",
                  },
                  {
                    value: "15",
                    label: "Sharjah",
                  },
                  {
                    value: "20",
                    label: "Ras Al Khaimah",
                  },
                  {
                    value: "25",
                    label: "Umm Al Quwain",
                  },
                  {
                    value: "30",
                    label: "Ajman",
                  },
                ]}
              />
              <Selector
                label="Sort By"
                value={sort}
                setValue={setSort}
                options={[
                  {
                    label: "Newest",
                    value: "newest",
                  },
                  {
                    label: "Oldest",
                    value: "oldest",
                  },
                  {
                    label: "Price Low to High",
                    value: "price-asc",
                  },
                  {
                    label: "Price High to Low",
                    value: "price-desc",
                  },
                  {
                    label: "Name A-Z",
                    value: "name-asc",
                  },
                  {
                    label: "Name Z-A",
                    value: "name-desc",
                  },
                ]}
              />
              <SelectAreaMap />
            </div>
            {/* 
          <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="minPrice" className="text-sm font-medium text-gray-700">
              Min Price
            </label>
            <Input
              label="Min Price"
              type="number"
              value={minPrice.toString()}
              onChange={(e) => {
                setMinPrice(Number(e.target.value) || '');
                setIsTyping(true);
              }}
              placeholder="0"
            //   className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <input
              id="minPrice"
              type="number"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(Number(e.target.value) || '');
                setIsTyping(true);
              }}
              placeholder="0"
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>

          <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="maxPrice" className="text-sm font-medium text-gray-700">
              Max Price
            </label>
            <input
              id="maxPrice"
              type="number"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value) || '');
                setIsTyping(true);
              }}
              placeholder="1000000"
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-transform duration-300 ease-in-out hover:scale-110"
            onClick={handleSearch}
          >
            Search
          </button> */}
          </form>
        </div>
      </section>
    </>
  );
};

export default FilterBar;
