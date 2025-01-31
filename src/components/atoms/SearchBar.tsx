import React from 'react'

interface SearchBarProps {
    name: string
    setName: (name: string) => void
    setIsTyping: (isTyping: boolean) => void
}

const SearchBar = ({ name, setName, setIsTyping }: SearchBarProps) => {
  return (
    <div className="flex flex-col w-full gap-2">
    <label htmlFor="name" className="text-md font-light text-gray-200">
      Search by name
    </label>
    <input
      id="name"
      type="text"
      value={name}
      onChange={(e) => {
        setName(e.target.value);
        setIsTyping(true);
      }}
      placeholder="e.g., Modern Apartment"
      className="w-full rounded-xl p-2 focus:ring-2 focus:ring-primary focus:outline-none transition-transform duration-300 ease-in-out hover:scale-[1.003] bg-white/70 backdrop-blur-sm placeholder:text-gray-500 text-gray-950"
      autoComplete="off"
    />
  </div>
  )
}

export default SearchBar