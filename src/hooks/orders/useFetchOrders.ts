import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { Meta, Pagination } from "../../components/shared/Pagination";
import { ORDERS_ENDPOINT } from "../../constants/ApiEndpoints";
import { useSearchParams } from "react-router-dom";

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
        links: Pagination;
        meta: Meta;
    };
}

const getOrders = async (pageNum: string, orderStatus?: string) => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", pageNum); // Always include the page number
    if (orderStatus) queryParams.append("status[0]", orderStatus); // Add status if provided

    const response = await apiClient.get<OrdersApiResponse>(`${ORDERS_ENDPOINT}?${queryParams.toString()}`);
    return response.data.data;
};

const useFetchOrders = ({ pageNum, orderStatus }: { pageNum: string; orderStatus?: string }) => {
    return useQuery({
        queryKey: ["orders", pageNum, orderStatus],
        queryFn: () => getOrders(pageNum, orderStatus),
        staleTime: 1000 * 60 * 1, // 1 minutes
        retry: 3,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
};

export default useFetchOrders;
