import React, { useEffect } from "react";
import OrdersDetailsTable from "./OrdersDetailsTable";
import { useParams } from "react-router-dom";
import useFetchOrders from "../../../hooks/orders/useFetchOrders";
import useFetchOrder from "../../../hooks/orders/useFetchOrder";
import Skeleton from "../../../components/shared/Skeleton";
import { showToast } from "../../../utils/showToast";
import handlingErrorOnStatusCode from "../../../utils/handlingErrorOnStatusCode";
import { useTranslation } from "react-i18next";
import OrderDetailsTopHeader from "./OrderDetailsTopHeader";
import HeaderOne from "../../../components/reuse/HeaderOne";
import CustomersDetailsInOrders from "./CustomersDetailsInOrders";

const OrdersDetails = () => {
    const { id } = useParams();
    const { data: orderDetails, isPending: isOrderDetailsFetching, isError, error } = useFetchOrder({ orderId: id! });

    if (isError) return showToast(handlingErrorOnStatusCode(error), "error");

    return (
        <div>
            {orderDetails && id && <HeaderOne orderNumber={orderDetails?.orderNumber} />}
            <OrderDetailsTopHeader orderDetails={orderDetails!} />
            {isOrderDetailsFetching && <Skeleton />}
            {orderDetails && id && <OrdersDetailsTable data={orderDetails} />}
            {orderDetails && id && <CustomersDetailsInOrders customer={orderDetails} />}
        </div>
    );
};

export default OrdersDetails;
