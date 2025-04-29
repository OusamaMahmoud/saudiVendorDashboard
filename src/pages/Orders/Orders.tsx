import { startTransition, Suspense, useState } from "react";
import CustomPagination from "../../components/shared/Pagination";
import useFetchOrders from "../../hooks/orders/useFetchOrders";
import OrdersTable from "./components/OrdersTable";
import Skeleton from "../../components/shared/Skeleton";
import handlingErrorOnStatusCode from "../../utils/handlingErrorOnStatusCode";
import { showToast } from "../../utils/showToast";
import OrdersPagination from "./components/OrdersPagination";
import { Outlet } from "react-router-dom";
import OrdersStatusFilter from "./components/OrdersStatusFilter";
import TopHeader from "../../components/reuse/TopHeader";

const Orders = () => {
    const [currentPage, setCurrentPage] = useState<string>("1");
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    const { data: orders, isPending: isFetchOrdersLoading, isError, error } = useFetchOrders({ pageNum: currentPage, orderStatus: selectedStatus });

    if (isError) {
        return showToast(handlingErrorOnStatusCode(error), "error");
    }

    return (
        <div>
            <TopHeader title="Orders" />
            <OrdersStatusFilter
                orders={orders!}
                onSelectedStatus={(selectedStatus) => setSelectedStatus(selectedStatus)}
                selectedStatus={selectedStatus}
            />
            {isFetchOrdersLoading ? <Skeleton /> : <OrdersTable data={orders?.data || []} />}
            <OrdersPagination
                orders={orders!}
                setCurrentPage={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default Orders;
