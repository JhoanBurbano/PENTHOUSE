import { QuerySearchProperties } from "@/types/Filters";
import { Property } from "@/types/Property";
import axiosClient from "@/utils/axiosClient";

export const getProperties = async (query?: QuerySearchProperties) => {
    try {
        const response = await axiosClient.get<Property[]>('/properties', { params: query });
        return response.data;
    } catch (error) {
        console.log(error); 
        return []
    }
}

export const getProperty = async (id: string) => {
    try {
        const response = await axiosClient.get<Property>(`/properties/${id}`);
        return response.data;
    } catch (error) {
        console.log(error); 
        return null
    }
}