export interface Option {
    value: string;
    label: string;
}

export type Options = Option[]

export interface Filters {
    location: Options;
    price: Options;
    propertyType: Options;
}

export interface QuerySearchProperties {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    sort?: string;
}