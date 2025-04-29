import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { COUPONS_ENDPOINT } from "../../constants/ApiEndpoints";
import { showToast } from "../../utils/showToast";

const deleteCoupon = async (id: string) => {
    await apiClient.post(`${COUPONS_ENDPOINT}/${id}`, {
        _method: "DELETE",
    });
};

const useDeleteCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCoupon,
        onSuccess: (_, id) => {
            showToast("تم حذف الكوبون بنجاح!", "success");

            queryClient.setQueryData(["coupons"], (oldData: any) => {
                if (!oldData) return [];
                return oldData.filter((coupon: any) => coupon.id !== id);
            });
        },
        onError: () => {
            showToast("فشل حذف الكوبون!", "error");
        },
    });
};

export default useDeleteCoupon;
