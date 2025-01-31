import { AxiosResponse } from "axios";
import { QuerySearchProperties } from "@/types/Filters";
import { Property } from "@/types/Property";
import axiosClient from "@/utils/axiosClient";

export const getProperties = async (query?: QuerySearchProperties) => {
    try {
        const response = await axiosClient.get<AxiosResponse<Property[]>>('/properties', { params: query });
        return response.data;
    } catch (error) {
        console.log(error); 
        return []
    }
}