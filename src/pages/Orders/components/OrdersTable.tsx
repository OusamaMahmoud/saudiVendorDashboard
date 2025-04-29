import { useTranslation } from "react-i18next";
import { Order } from "../../../hooks/orders/useFetchOrders";
import { useNavigate } from "react-router-dom";

const OrdersTable = ({ data: orders }: { data: Order[] }) => {
    const { t } = useTranslation();

    const tableHeaders = [
        t("orders:table_headers.order_number"),
        t("orders:table_headers.customer"),
        t("orders:table_headers.order_date"),
        t("orders:table_headers.total"),
        t("orders:table_headers.order_details"),
    ];
    const navigate = useNavigate();
    return (
        <div className="overflow-x-auto">
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
                    {orders.map((order) => (
                        <tr
                            key={order.id}
                            className="cursor-pointer transition-all duration-300 hover:bg-slate-300"
                        >
                            <th>{order.id}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={order.userImage}
                                                alt="Avatar Tailwind CSS Component"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{order.userName}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{order.orderNumber}</td>
                            <td>{order.total}</td>
                            <td>
                                <button
                                    onClick={() => navigate(`/order-details/${order.id}`)}
                                    className="btn btn-xs bg-blue-500 text-white hover:bg-blue-400"
                                >
                                    {t("orders:orderDetails")}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
