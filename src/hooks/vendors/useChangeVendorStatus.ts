import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { showToast } from "../../utils/showToast";
import handlingErrorOnStatusCode from "../../utils/handlingErrorOnStatusCode";

const changeStatus = async ({ vendorId, currentStatus, blockStatus }: { vendorId?: string; currentStatus?: string; blockStatus?: 0 | 1 }) => {
    const res = await apiClient.post(`/api/admin/vendor/updateStatus/${vendorId}`, { status: currentStatus, approved: blockStatus });
    console.log("Change Status", res.data);
    return res.data.data;
};

const useChangeVendorStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: changeStatus,
        onSuccess: () => {
            showToast("Status has been Successfully Changed.", "success");
            queryClient.invalidateQueries({
                queryKey: ["vendors"],
            });
        },
        onError: (error: unknown) => {
            // Show a user-friendly error message
            showToast(handlingErrorOnStatusCode(error), "error");
        },
    });
};

export default useChangeVendorStatus;
