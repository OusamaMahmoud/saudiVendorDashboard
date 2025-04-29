import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { Meta, Pagination } from "../../components/shared/Pagination";
import { ORDERS_DETAILS_ENDPOINT, ORDERS_ENDPOINT } from "../../constants/ApiEndpoints";

export type Product = {
    productName: string;
    productId: string;
    thumbnail: string;
    price: string;
    discount: string;
    priceAfterDiscount: string;
    quantity: string;
    productNumber: string;
    currentStockAmount: string;
    skuAttributes: {
        key: string;
        value: string;
    }[];
};

export type OrderDetails = {
    id: string;
    orderNumber: string;
    total: string;
    subtotalBeforeApplyCoupon: string;
    subTotalAfterApplyCoupon: string;
    couponDiscountAmount: string;
    tax: string;
    shipping: string;
    currency: string;
    orderStatus: string;
    paymentMethod: string;
    paymentStatus: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    billingAddress: string;
    shippingAddress: string;
    buildingNumber: string;
    flatNumber: string;
    long: string;
    lat: string;
    shippingMethod: string;
    trackingNumber: string;
    appliedCouponCode: string;
    metadata: string;
    orderNotes: string;
    orderSource: string;
    couponId: string;
    userId: string;
    dateCreated: string;
    orderDetails: Product[];
};

export interface OrderDetailsApiResponse {
    data: OrderDetails;
}

const getOrderDetails = async (orderId: string) => {
    const response = await apiClient.get<OrderDetailsApiResponse>(`${ORDERS_DETAILS_ENDPOINT}/${orderId}`);
    const data = response.data;
    console.log("Does this Order details => ", data.data);
    return data.data;
};

const useFetchOrder = ({ orderId }: { orderId: string }) => {
    return useQuery({
        queryKey: ["orderDetails", orderId],
        queryFn: () => getOrderDetails(orderId),
        staleTime: 1000 * 60 * 1, // 1 minutes
        retry: 3,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        enabled: !!orderId,
    });
};

export default useFetchOrder;
