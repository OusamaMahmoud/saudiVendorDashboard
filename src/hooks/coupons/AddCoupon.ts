import { useMutation, useQueryClient } from "@tanstack/react-query";
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

const addCoupon = async (couponData: CouponPayload) => {
    const response = await apiClient.post(COUPONS_ENDPOINT, couponData);
    return response.data;
};

const useAddCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCoupon,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Addcoupons"] });
        },
    });
};

export default useAddCoupon;