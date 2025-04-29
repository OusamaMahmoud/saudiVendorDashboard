import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface SaudiCategory {
    id: string;
    name: {
        en: string;
        ar: string;
    };
    image: string;
    parent_id: string;
    isLastLevel: number;
    childs: SaudiCategory[];
}

const getCategories = async () => {
    const res = await apiClient.get<{ data: SaudiCategory[] }>("/api/dashboard/categories");
    console.log(res);
    return res.data.data;
};

const useFetchCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        refetchOnWindowFocus: false,
        retry: 3,
        staleTime: 1000 * 60 * 1,
    });
};

export default useFetchCategories;
