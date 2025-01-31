export const inputClasses = {
  base: "w-full px-4 py-3 border border-gray-200 rounded-lg outline-none transition-all pr-12 text-xs md:text-sm",
  default: "border-gray-300 focus:ring-2 focus:ring-[#9B7B4D] focus:border-transparent",
  error: "border-red-500 focus:border-red-600",
  disabled: "bg-gray-100 cursor-not-allowed opacity-75",
  focus: "focus:outline-none focus:ring-2 focus:ring-[#9B7B4D] focus:border-transparent",
} as const;

export const labelClasses = {
  base: "block text-sm font-medium mb-1",
  default: "text-gray-700",
  error: "text-red-500",
  disabled: "text-gray-400",
} as const;

export const propertyCardClasses = {
  container: "flex flex-col bg-white shadow-md rounded-xl overflow-hidden cursor-pointer",
  imageContainer: "relative w-full h-48",
  contentContainer: "p-4 md:p-6 flex flex-col gap-2 relative",
  badge: "absolute top-4 md:top-6 right-4 md:right-6 flex flex-col items-end md:gap-2",
  priceContainer: "flex items-center gap-1",
  locationContainer: "flex items-center gap-1",
  amenitiesContainer: "flex items-center justify-between gap-2",
} as const;
