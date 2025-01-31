"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../atoms/Button";
import Image from "next/image";
import penhouse_logo from "../../../public/penhouse_lettering_gold_white.webp";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <>
      <nav className="shadow-md fixed w-full z-50 bg-black/70 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center text-xs">
          {/* Logo */}
          <Link href="/" className="relative w-32 h-8" onClick={() => setIsOpen(false)}>
            <Image src={penhouse_logo} alt="Penhouse Logo" priority fill className="object-contain" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/properties"
              className="text-gray-50 hover:text-primary transition-colors"
            >
              Properties
            </Link>
            <Link href="/about" className="text-gray-50 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-50 hover:text-primary transition-colors">
              Contact
            </Link>
            <Button
              label="Login"
              onClick={() => handleNavigation('seller/login')}
              variant="primary"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="block md:hidden text-primary focus:outline-none p-2 hover:bg-primary/10 rounded-lg transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black/90 backdrop-blur-2xl transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } z-40`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          <button
            onClick={() => handleNavigation('/properties')}
            className="w-full text-center text-2xl font-light text-gray-50 hover:text-primary transition-colors py-4 border-b border-gray-800"
          >
            Properties
          </button>
          <button
            onClick={() => handleNavigation('/about')}
            className="w-full text-center text-2xl font-light text-gray-50 hover:text-primary transition-colors py-4 border-b border-gray-800"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation('/contact')}
            className="w-full text-center text-2xl font-light text-gray-50 hover:text-primary transition-colors py-4 border-b border-gray-800"
          >
            Contact
          </button>
          <Button
            label="Login"
            onClick={() => handleNavigation('seller/login')}
            variant="primary"
            className="w-full max-w-xs mt-4"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
