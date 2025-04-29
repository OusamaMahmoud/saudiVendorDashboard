import React, { useState } from "react";
import { Order, OrdersApiResponse } from "../../../hooks/orders/useFetchOrders";
import CustomPagination, { Meta, Pagination } from "../../../components/shared/Pagination";

const OrdersPagination = ({
    orders,
    setCurrentPage,
}: {
    orders: {
        data: Order[];
        links: Pagination;
        meta: Meta;
    };
    setCurrentPage: (page: string) => void;
}) => {
    function getPageNumber(url: string) {
        const urlObj = new URL(url); // Parse the URL
        return urlObj.searchParams.get("page"); // Get the value of the 'page' query parameter
    }
    return (
        <div className="mt-8">
            {orders?.meta && (
                <CustomPagination
                    links={orders?.links!}
                    meta={orders?.meta!}
                    handleGetFirstPage={() => {
                        const result = getPageNumber(orders?.links?.first!);
                        console.log("firstPage=>", result);
                        if (result) setCurrentPage(result);
                    }}
                    handleGetLastPage={() => {
                        const result = getPageNumber(orders?.links?.last!);
                        if (result) setCurrentPage(result);
                    }}
                    handleGetNextPage={() => {
                        const result = getPageNumber(orders?.links?.next!);
                        if (result) setCurrentPage(result);
                    }}
                    handleGetPrevPage={() => {
                        const result = getPageNumber(orders?.links?.prev!);
                        if (result) setCurrentPage(result);
                    }}
                />
            )}
        </div>
    );
};

export default OrdersPagination;
