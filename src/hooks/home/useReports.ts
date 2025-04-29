import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { REPORTS_ENDPOINT } from "../../constants/ApiEndpoints";

export interface ReportData {
    total_orders: number;
    total_users: number;
    total_sales: string;
    average_sales_per_user: number;
    orders_have_coupon: number;
    user_used_coupon: number;
}

const useReports = () => {
    return useQuery<ReportData>({
        queryKey: ["reports"],
        queryFn: async () => {
            const response = await apiClient.get(REPORTS_ENDPOINT);
            return response.data.data;
        },
    });
};

export default useReports;
