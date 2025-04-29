import { Footer } from "../../layouts/footer";
import { CreditCard, DollarSign, Package, TrendingUp, Users } from "lucide-react";
import { TiMessages } from "react-icons/ti";
import { FaLayerGroup } from "react-icons/fa";
import useFetchOrders from "../../hooks/home/useFetchOrdersTop";
import useReports from "../../hooks/home/useReports";
import { useTranslation } from "react-i18next";
import i18n from "../../i18/i18";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";

const DashboardPage = () => {
    const { data: orders } = useFetchOrders();
    const { data, isLoading, error } = useReports();
    const { t } = useTranslation();
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error || !data) {
        return <p>Error loading report data.</p>;
    }
    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">{t("home:title")}</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-[#006638]/20 p-2 text-[#006638] transition-colors dark:bg-blue-600/20 dark:text-[#006638]">
                            <Package size={26} />
                        </div>
                        <p className="card-title">{t("home:total_products")}</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{data.total_orders}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-[#006638]/20 p-2 text-[#006638] transition-colors dark:bg-[#006638]/20 dark:text-[#006638]">
                            <DollarSign size={26} />
                        </div>
                        <p className="card-title">{t("home:total_sales")}</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{data.total_sales}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-[#006638]/20 p-2 text-[#006638] transition-colors dark:bg-[#006638]/20 dark:text-[#006638]">
                            <Users size={26} />
                        </div>
                        <p className="card-title">{t("home:total_customers")}</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{data.total_users}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-[#006638]/20 p-2 text-[#006638] transition-colors dark:bg-[#006638]/20 dark:text-[#006638]">
                            <CreditCard size={26} />
                        </div>
                        <p className="card-title">{t("home:order_coupon")}</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">${data.orders_have_coupon}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-[#006638]/20 p-2 text-[#006638] transition-colors dark:bg-[#006638]/20 dark:text-[#006638]">
                            <CreditCard size={26} />
                        </div>
                        <p className="card-title">{t("home:average_sales_per_user")}</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">${data.average_sales_per_user}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-[#006638]/20 p-2 text-[#006638] transition-colors dark:bg-[#006638]/20 dark:text-[#006638]">
                            <CreditCard size={26} />
                        </div>
                        <p className="card-title">{t("home:user_coupon")}</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">${data.user_used_coupon}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="card flex flex-row items-center col-span-7 gap-x-4 p-6">
                    <div className="card-body p-0">
                        <button className="bg-[#006638] text-white p-4 w-fit rounded">
                            <TiMessages />
                        </button>
                    </div>

                    <div className="card-header flex flex-col justify-center items-end ml-auto text-right gap-y-1">
                        <p className="card-title">{i18n.language === "ar" ? "التقييمات" : "Rates"}</p>
                        <p className="card-title">1000</p>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header flex justify-between">
                        <p className="card-title">
                            {t("home:latestorder")}
                        </p>
                    <Link to={"/orders"}>
                        <button className="w-fit flex items-center mx-2 bg-[#006638] text-white px-6 py-3 rounded"><span><FaLayerGroup style={{ margin: "0 8px" }} /></span>{i18n.language === "ar" ? "جميع الطلبات" : "ALl Orders"}</button>
                    </Link>
                </div>
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full overflow-auto">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    <th className="table-head">{t("home:tableHeader.orderNo")}</th>
                                    <th className="table-head">{t("home:tableHeader.client")}</th>
                                    <th className="table-head">{t("home:tableHeader.orderDate")}</th>
                                    <th className="table-head">{t("home:tableHeader.result")}</th>
                                    <th className="table-head">{t("home:tableHeader.orderDetails")}</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {orders?.data?.slice(0, 5).map((order) => (
                                    <tr key={order.id} className="table-row">
                                        <td className="table-cell">{order.id}</td>
                                        <td className="table-cell">
                                            <div className="flex items-center gap-2">
                                                <img src={order.userImage} alt={order.userName} className="h-10 w-10 rounded-full" />
                                                <p>{order.userName}</p>
                                            </div>
                                        </td>
                                        <td className="table-cell">
                                            {new Date(order.dateCreated).toLocaleDateString("en-EG", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}{" "}
                                            {new Date(order.dateCreated).toLocaleTimeString("en-EG", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                                hour12: true
                                            })}
                                        </td>
                                        <td className="table-cell">{parseFloat(order.total).toFixed(2)} {order.currency}</td>
                                        <td>
                                            <button
                                                onClick={() => navigate(`/order-details/${order.id}`)}
                                                className="btn btn-xs px-4 bg-[#006638] text-white hover:bg-[#2b6d4f]"
                                            >
                                                {t("orders:orderDetails")} {i18n.language === "ar" ? <FaArrowLeftLong /> : <FaArrowRightLong />}
                                            </button>
                                        </td>
                                    </tr>
                                )) || []}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;
