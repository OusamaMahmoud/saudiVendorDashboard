import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { OrderDetails, OrderDetailsApiResponse } from "../../../hooks/orders/useFetchOrder";
import { Pagination, Meta } from "../../../components/shared/Pagination";
import { useEffect } from "react";

const OrdersDetailsTable = ({ data: order }: { data: OrderDetails }) => {
    const { t } = useTranslation();

    const tableHeaders = [
        t("orders:ordersDetailsTableHeaders.product"),
        t("orders:ordersDetailsTableHeaders.productNumber"),
        t("orders:ordersDetailsTableHeaders.currentQuantity"),
        t("orders:ordersDetailsTableHeaders.price"),
        t("orders:ordersDetailsTableHeaders.color"),
    ];
    useEffect(() => {
        console.log(order.orderDetails[0]?.skuAttributes[0].value);
    }, [order]);
    return (
        <div className="mb-10 overflow-x-auto">
            <table className="table border">
                {/* head */}
                <thead className="border">
                    <tr className="border border-b-slate-200 text-lg">
                        {tableHeaders.map((head, idx) => (
                            <th key={idx}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {order?.orderDetails &&
                        order?.orderDetails.map((orderDetail) => (
                            <tr
                                key={orderDetail.productId}
                                className="cursor-pointer transition-all duration-300 hover:bg-slate-300"
                            >
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={orderDetail.thumbnail}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{orderDetail.productName}</div>
                                        </div>
                                    </div>
                                </td>
                                <th>{orderDetail.productNumber}</th>
                                <td>{orderDetail.quantity}</td>
                                <td>{orderDetail.price}</td>
                                <td>
                                    <p
                                        className="h-6 w-6 cursor-pointer rounded-full transition-all hover:opacity-45"
                                        style={{
                                            backgroundColor:
                                                orderDetail?.skuAttributes[0]?.key.toLowerCase() === "color"
                                                    ? orderDetail?.skuAttributes[0]?.value
                                                    : undefined,
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersDetailsTable;
