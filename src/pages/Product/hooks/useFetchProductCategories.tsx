import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "../../../utils/apiClient";
import { PRODUCT_CATEGORIES } from "../../../constants/ApiEndpoints";

export type ProductCategory = {
    id: string;
    path: string;
};

export interface ProductCategoriesApiResponse {
    data: ProductCategory[];
}

const getProductCategories = async () => {
    const response = await apiClient.get<ProductCategory[]>(PRODUCT_CATEGORIES);
    console.log("productCategories=>", response.data);
    return response.data;
};

const useFetchProductCategories = () => {
    return useQuery({
        queryKey: ["productCategories"],
        queryFn: () => getProductCategories(),
        staleTime: 1000 * 60 * 1, // 1 minutes
        retry: 3,
        refetchOnWindowFocus: false,
    });
};

export default useFetchProductCategories;
