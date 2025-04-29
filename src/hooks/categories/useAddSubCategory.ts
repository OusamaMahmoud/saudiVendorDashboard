import { useMutation } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { showToast } from "../../utils/showToast";
import { useNavigate } from "react-router-dom";

const addSubCategory = async ({ formData, categoryId }: { formData: any; categoryId?: string }) => {
    const endpoint = categoryId ? `/api/dashboard/categories/${categoryId}` : `/api/dashboard/categories`;
    const res = await apiClient.post(endpoint, formData);
    console.log(res.data);
    return res.data.data;
};

const useAddSubCategory = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: addSubCategory,
        onSuccess: () => {
            showToast("Category has been Successfully Added!");
            setTimeout(() => navigate("/categories/add"), 2000);
        },
    });
};
export default useAddSubCategory;
