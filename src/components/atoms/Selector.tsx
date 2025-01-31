import React from 'react'
import { Option, Options } from '@/types/Filters'

type Props = {
    label: string
    value?: Option
    setValue: React.Dispatch<React.SetStateAction<Option | undefined>>
    options: Options
}

const Selector = ({ label, value, setValue, options }: Props) => {

  const [isActive, setIsActive] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const __renderButtonText = () => {
    if(!value?.value)return "None"
    return value.label
  }

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
  }
  
  const onSelectOption = (option: Option) => {
    setValue(option);
    onDeactivate();
    if(option.value === value?.value) {
      setValue(undefined);
    }
  }

  const __renderOptions = () => {
    return (
      <div className={`absolute -bottom-1 translate-y-full left-1/2 -translate-x-1/2 bg-gray-100 grid grid-cols-1 gap-2 p-2 shadow-md rounded-sm w-[300px] ${
        isAnimating ? "animate-fadeOut" : "animate-fadeIn"
      }`}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelectOption(option)}
            className={`text-sm font-serif p-1 rounded-md bg-gray-400 font-bold hover:bg-primary flex items-center justify-center ${option.value === value?.value ? "bg-primary" : ""}`}
          >
            <p className="text-xs font-medium text-gray-700 font-sans"> {option.label}</p>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 relative w-40">
      <button
        onClick={toggleActive}
        className="text-sm font-serif flex flex-col items-center justify-center p-1 bg-primary hover:brightness-110 active:brightness-90 transition-all duration-300 text-black font-extrabold rounded-xl"
      >
        <label className="text-xs font-light text-zinc-800 font-serif">
          {label}
        </label>
        {__renderButtonText()}
      </button>
      {isActive && __renderOptions()}
    </div>
  );
}

export default Selector;