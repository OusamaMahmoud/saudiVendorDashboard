import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { Meta, Pagination } from "../../components/shared/Pagination";
import { VENDORS_ENDPOINT } from "../../constants/ApiEndpoints";
import { Search } from "lucide-react";

export type Vendor = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    image: string;
    status: "pending" | "approved" | "rejected";
    approved: string;
};

export interface VendorsApiResponse {
    data: {
        data: Vendor[];
        links: Pagination;
        meta: Meta;
    };
}

const getVendors = async (pageNum: string, orderStatus?: string, search?: string) => {
    const response = await apiClient.get<VendorsApiResponse>(`${VENDORS_ENDPOINT}?page=${pageNum}&&status=${orderStatus}&&search=${search}`);
    const data = response.data;
    console.log(data);
    return data.data;
};

const useFetchVendors = ({ pageNum, orderStatus, search }: { pageNum: string; orderStatus?: string; search: string }) => {
    return useQuery({
        queryKey: ["vendors", pageNum, orderStatus, search],
        queryFn: () => getVendors(pageNum, orderStatus, search),
        staleTime: 1000 * 60 * 1, // 1 minutes
        retry: 3,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
};

export default useFetchVendors;
