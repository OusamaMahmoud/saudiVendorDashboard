import OrdersStatusFilterItem from "./OrdersStatusFilterItem";
import { Pagination, Meta } from "../../../components/shared/Pagination";
import { Order } from "../../../hooks/orders/useFetchOrders";
import { useState } from "react";

const OrdersStatusFilter = ({
    orders,
    onSelectedStatus,
    selectedStatus,
}: {
    orders: {
        data: Order[];
        links: Pagination;
        meta: Meta;
    };
    onSelectedStatus: (status: string) => void;
    selectedStatus: string;
}) => {
    //pending,cancelled,delivered,approved
    const orderStatuses = [
        { label: "All", value: "" },
        { label: "Pending", value: "pending" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Delivered", value: "delivered" },
        { label: "Approved", value: "approved" },
    ];

    return (
        <div className="mb-6 mt-4 flex flex-col gap-4 rounded-xl border p-3 shadow-xl md:flex-row md:flex-wrap">
            {orderStatuses.map((status) => (
                <OrdersStatusFilterItem
                    key={status.label}
                    label={status.label}
                    totOrdersNo={orders?.meta?.total}
                    handleClickBtn={() => onSelectedStatus(status.value)}
                    isSelected={selectedStatus === status.value}
                />
            ))}
        </div>
    );
};

export default OrdersStatusFilter;
