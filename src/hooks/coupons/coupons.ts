import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { COUPONS_ENDPOINT } from "../../constants/ApiEndpoints";

interface Coupon {
    id: string;
    code: string;
    discount: number;
    expiryDate: string;
    maxUses: number;
}

const getCoupons = async (): Promise<Coupon[]> => {
    const response = await apiClient.get(COUPONS_ENDPOINT);
    return response.data.data.data || [];
};

const useFetchCoupons = () => {
    return useQuery<Coupon[], Error>({
        queryKey: ["coupons"],
        queryFn: getCoupons,
        staleTime: 1000 * 60 * 1,
        retry: 3,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
};

export default useFetchCoupons;
