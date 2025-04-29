import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { Meta, Pagination } from "../../components/shared/Pagination";
import { USERS_ENDPOINT } from "../../constants/ApiEndpoints";

export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    city: string;
    orders_count: number;
};

export interface OrdersApiResponse {
    data: {
        data: User[];
        links: Pagination;
        meta: Meta;
    };
}

const getUsers = async (pageNum: string, search: string) => {
    const response = await apiClient.get<OrdersApiResponse>(`${USERS_ENDPOINT}?page=${pageNum}&&search=${search}`);
    const data = response.data;
    return data.data;
};

const useFetchUsers = ({ pageNum, search }: { pageNum: string; search: string }) => {
    return useQuery({
        queryKey: ["users", pageNum, search],
        queryFn: () => getUsers(pageNum, search),
        staleTime: 1000 * 60 * 1, // 1 minutes
        retry: 3,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
};

export default useFetchUsers;
