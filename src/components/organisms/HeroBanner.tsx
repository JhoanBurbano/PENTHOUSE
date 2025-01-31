"use client";

import React from "react";
import Head from "next/head";
import Button from "../atoms/Button";
import Image from "next/image";
import HeroBannerImage from "../../../public/luxury_home.webp";
import useIntersectionObserver from "@/hooks/useIntersectionObservers";
import { useRouter } from "next/navigation";


const HeroBanner: React.FC = () => {
  const { isIntersecting, elementRef } = useIntersectionObserver(0.2);
  const router = useRouter();

  // Mock
  const propertyData = {
    name: "Luxury Dream Home",
    description:
      "A luxurious modern home with stunning design, offering 5 bedrooms, 4 baths, and breathtaking views.",
    imageUrl: "/luxury_home.webp",
    location: {
      address: "123 Luxury Lane, Beverly Hills, CA, USA",
    },
    price: "2,500,000 USD",
  };

  // JSON-LD for structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: propertyData.name,
    description: propertyData.description,
    image: propertyData.imageUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: propertyData.location.address,
    },
    price: propertyData.price,
  };

  return (
    <>
      {/* JSON-LD Script for SEO */}
      <Head>
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(jsonLd) 
        }}
      />
      </Head>

      <header
        ref={elementRef}
        className={`relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center transition-opacity duration-1000 ${
          isIntersecting ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={HeroBannerImage}
          alt="A luxurious modern home with stunning design"
          className="w-full h-full object-cover absolute inset-0"
          placeholder="blur"
          priority
          fetchPriority="high"
        />

        <span
          className="absolute inset-0 bg-black bg-opacity-40"
          aria-hidden="true"
        />

        <article
          className={`relative z-10 flex flex-col items-center justify-center text-center text-white px-6 ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          } transition-all duration-1000`}
          aria-labelledby="hero-title"
          role="banner"
        >
          <h1
            id="hero-title"
            className="text-5xl md:text-7xl font-bold leading-tight transition-transform duration-500 hover:scale-105"
          >
            {propertyData.name}
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-light max-w-3xl transition-opacity duration-1000 delay-200">
            {propertyData.description}
          </p>
          <div className="mt-8">
            <Button
              label="Explore Properties"
              onClick={() => router.push("/properties")}
              variant="primary"
            />
          </div>
        </article>
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <span className="block w-4 h-4 border-2 border-white rounded-full animate-bounce m-auto"></span>
          <span className="block mt-2 text-white text-center text-sm">Scroll Down</span>
        </div>
      </header>
    </>
  );
};

export default HeroBanner;
