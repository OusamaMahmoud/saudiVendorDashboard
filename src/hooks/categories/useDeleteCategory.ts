import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { showToast } from "../../utils/showToast";
import handlingErrorOnStatusCode from "../../utils/handlingErrorOnStatusCode";

const deleteCategory = async ({ targetId }: { targetId: string }) => {
    const res = await apiClient.post(`/api/dashboard/categories/${targetId}`, { _method: "delete" });
    console.log(res.data);
    return res.data.data;
};

const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            showToast("Category has been Successfully Deleted.", "success");
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
        onError: (error: unknown) => {
            // Show a user-friendly error message
            showToast(handlingErrorOnStatusCode(error), "error");
        },
    });
};

export default useDeleteCategory;
