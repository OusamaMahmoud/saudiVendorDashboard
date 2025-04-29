import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { Meta, Pagination } from "../../components/shared/Pagination";
import { ORDERS_ENDPOINT } from "../../constants/ApiEndpoints";

export type Order = {
    id: string;
    orderNumber: string;
    userName: string;
    userEmail: string;
    userImage: string;
    dateCreated: string;
    total: string;
    currency: string;
};

export interface OrdersApiResponse {
    data: {
        data: Order[];
        links?: Pagination;
        meta?: Meta;
    };
}

const getOrders = async () => {
    const response = await apiClient.get<OrdersApiResponse>(ORDERS_ENDPOINT);
    return response.data.data || [];
};

const useFetchOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
        staleTime: 1000 * 60 * 1, // 1 minute
        retry: 3,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
};

export default useFetchOrders;
