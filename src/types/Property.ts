import { Owner } from "./Owner";

export interface Property {
  id: string;
  name: string;
  price: number;
  address: {
    addressText: string;
    location: string[];
  };
  owner: Owner;
  image: string;
  images: string[];
  year: number;
  amenities: Amenities;
  traces: Traces[];
}

export interface Amenities {
  beds: number;
  baths: number;
  length: number;
  garage?: number;
}

export interface Traces {
  id: string;
  name: string;
  tax: number;
  dateSale: string;
  value: number;
}
