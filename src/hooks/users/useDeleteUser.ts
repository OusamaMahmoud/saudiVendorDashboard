import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { showToast } from "../../utils/showToast";
import handlingErrorOnStatusCode from "../../utils/handlingErrorOnStatusCode";

const deleteUser = async ({ targetId }: { targetId: string }) => {
    const res = await apiClient.get(`/api/dashboard/user/delete/${targetId}`);
    console.log(res.data);
    return res.data.data;
};

const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            showToast("User has been Successfully Deleted.", "success");
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
        onError: (error: unknown) => {
            // Show a user-friendly error message
            showToast(handlingErrorOnStatusCode(error), "error");
        },
    });
};

export default useDeleteUser;
