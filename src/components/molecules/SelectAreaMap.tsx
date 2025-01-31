import React from "react";

const SelectAreaMap = () => {
  const __renderButtonText = () => {
    return "None";
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <button
        onClick={() => {}}
        className="text-sm w-full font-serif flex flex-col items-center justify-center p-1 bg-primary hover:brightness-110 active:brightness-90 transition-all duration-300 text-black font-extrabold rounded-xl"
      >
        <label className="text-xs font-light text-zinc-800 font-serif">
          Find in Area
        </label>
        {__renderButtonText()}
      </button>
    </div>
  );
};

export default SelectAreaMap;
