import React, { useEffect, useState } from "react";

interface PriceRangeProps {
  minPrice: number;
  maxPrice: number;
  onSelectRange: (min: number, max: number) => void;
}

const PriceRange = ({
  minPrice = 10,
  maxPrice = 20,
  onSelectRange,
}: PriceRangeProps) => {
  const [min, setMin] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const onDeactivate = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIsActive(false);
    }, 300);
  };

  const toggleActive = () => {
    if (isActive) {
      onDeactivate();
    } else {
      setIsActive(true);
    }
  };

  const __renderButtonText = () => {
    if (!min || !max) return (
      <p className="ml-1 text-xs font-sans">
        None
      </p>
    );
    return (
      <ul className="flex gap-1 font-sans font-semibold">
        {[min, max].map((price, index) => (
          <li key={index} className="flex items-center">
            <p className="text-md font-sans"> $</p>
            <p className="text-md font-sans">{`${price}M`}</p>
            {index === 0 && (
              <p className="ml-1 text-xs font-sans">
                {" "}
                -{" "}
              </p>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const _onSelectRange = () => {
    console.log(min, max);
    onSelectRange(min as number, max as number);
    onDeactivate();
    setIsSelecting(true);
  };

  const onSelectOption = (price: number) => {
    try {
      if (min === price) {
        setMax(max ? null : max);
        return setMin(null);
      }

      if (max === price) {
        return setMax(null);
      }

      if (!min || price < min) {
        return setMin(price);
      }

      if (!max || price < max) {
        return setMax(price);
      }

      setMax(null);
      setMin(price);
    } finally {
      setIsSelecting(false);
    }
  };

  useEffect(() => {
    if (isActive && min && max && !isSelecting) {
      _onSelectRange();
    }
  }, [min, max, isActive, isSelecting]);

  return (
    <div className="flex flex-col gap-2 relative w-40">
      <button
        onClick={toggleActive}
        className="text-sm font-serif flex flex-col items-center justify-center p-1 bg-primary hover:brightness-110 active:brightness-90 transition-all duration-300 text-black font-extrabold rounded-xl"
      >
        <label className="text-xs font-light text-zinc-800 font-serif">
          Price Range
        </label>
        {__renderButtonText()}
      </button>
      {isActive && (
        <div
          className={`absolute -bottom-1 translate-y-full left-1/2 -translate-x-1/2 bg-gray-100 grid grid-cols-3 gap-2 p-2 shadow-md rounded-sm w-[300px] ${
            isAnimating ? "animate-fadeOut" : "animate-fadeIn"
          }`}
        >
          {Array.from(
            { length: maxPrice - minPrice + 1 },
            (_, i) => i + minPrice
          ).map((price) => (
            <button
              key={price}
              onClick={() => onSelectOption(price)}
              className={`text-sm font-serif p-1 rounded-md bg-gray-400 font-bold hover:bg-primary flex items-center justify-center ${
                min === price || max === price
                  ? "bg-primary"
                  : price > min! && price < max!
                  ? "bg-primary/60"
                  : ""
              }`}
            >
              <p className="text-xs font-medium text-gray-700 font-sans"> $</p>
              <p className="text-xs font-medium text-gray-700 font-sans">{`${price}M`}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriceRange;
