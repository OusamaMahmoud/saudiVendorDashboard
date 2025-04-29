import { Pagination, Meta } from "../../../components/shared/Pagination";
import { Order } from "../../../hooks/orders/useFetchOrders";
import { useState } from "react";
import OrdersStatusFilterItem from "../../Orders/components/OrdersStatusFilterItem";
import VendorsStatusFilterItem from "./VendorsStatusFilterItem";
import { Vendor } from "../../../hooks/vendors/useFetchVendors";

const VendorsStatusFilter = ({
    vendors,
    onSelectedStatus,
    selectedStatus,
}: {
    vendors: {
        data: Vendor[];
        links: Pagination;
        meta: Meta;
    };
    onSelectedStatus: (status: string) => void;
    selectedStatus: string;
}) => {
    //pending,cancelled,delivered,approved
    const orderStatuses = [
        { label: "All", value: "" },
        { label: "Rejected", value: "rejected" },
        { label: "Approved", value: "approved" },
        { label: "Pending", value: "pending" },
    ];
    return (
        <div className="mb-6 mt-4 flex flex-col gap-4 rounded-xl border p-3 shadow-xl md:flex-row md:flex-wrap">
            {orderStatuses.map((status) => (
                <VendorsStatusFilterItem
                    key={status.label}
                    label={status.label}
                    totOrdersNo={vendors?.meta?.total}
                    handleClickBtn={() => onSelectedStatus(status.value)}
                    isSelected={selectedStatus === status.value}
                />
            ))}
        </div>
    );
};

export default VendorsStatusFilter;
