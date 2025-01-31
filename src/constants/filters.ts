import { Options } from "@/types/Filters";

export const cities: Options = [
  { label: "New York", value: "new-york" },
  { label: "Los Angeles", value: "los-angeles" },
  { label: "Miami", value: "miami" },
  { label: "San Francisco", value: "san-francisco" },
  { label: "Chicago", value: "chicago" },
  { label: "Houston", value: "houston" },
  { label: "Las Vegas", value: "las-vegas" },
  { label: "Seattle", value: "seattle" },
] as const;

export const sortOptions: Options = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest First", value: "date-desc" },
  { label: "Most Popular", value: "popular" },
  { label: "Best Match", value: "relevance" },
] as const;

export const priceRanges = {
  min: 0.5,
  max: 50,
  steps: [0.5, 1, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
} as const;

export const areaRanges = {
  min: 500,
  max: 10000,
  steps: [500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
} as const;
