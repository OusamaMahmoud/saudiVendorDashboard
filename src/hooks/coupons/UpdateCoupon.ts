import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { COUPONS_ENDPOINT } from "../../constants/ApiEndpoints";

interface CouponPayload {
    code: string;
    type: "general" | "firstOrder" | "freeShipping";
    discount_type: "fixed" | "percentage";
    value: number;
    user_id?: number;
    min_cart_total: number;
    max_uses: number;
    user_uses_limit: number;
    expires_at: string;
    is_active: number;
}

const fetchCouponById = async (couponId: number) => {
    const response = await apiClient.get(`${COUPONS_ENDPOINT}/${couponId}`);
    return response.data.data;
};

const updateCoupon = async ({ id, ...couponData }: CouponPayload & { id: number }) => {
    const response = await apiClient.put(`${COUPONS_ENDPOINT}/${id}`, couponData);
    return response.data;
};

export const useGetCouponById = (couponId: number) => {
    return useQuery({
        queryKey: ["coupon", couponId],
        queryFn: () => fetchCouponById(couponId),
        enabled: !!couponId,
    });
};

export const useUpdateCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCoupon,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Updatecoupons"] });
        },
    });
};
