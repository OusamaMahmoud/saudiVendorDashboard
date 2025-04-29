import React from "react";
import { useTranslation } from "react-i18next";
import { OrderDetails } from "../../../hooks/orders/useFetchOrder";
import { PowerOffIcon } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdFireTruck } from "react-icons/md";
import { MdPayments } from "react-icons/md";

const CustomersDetailsInOrders = ({
    customer: {
        customerName,
        customerEmail,
        customerPhone,
        billingAddress,
        couponDiscountAmount,
        total,
        shippingAddress,
        subTotalAfterApplyCoupon,
        buildingNumber,
        flatNumber,
        orderNotes,
        paymentMethod,
    },
}: {
    customer: OrderDetails;
}) => {
    const { t } = useTranslation();

    return (
        <div className="mt-4 rounded-lg border p-6 shadow-md">
            <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">{t("orders:customer.customer")}</h2>

            <div className="flex flex-col justify-between gap-y-2 rounded-xl border p-2 text-gray-700 md:flex-row md:gap-y-0">
                <div className="flex flex-col gap-3 p-2">
                    <p className="flex items-center gap-2 text-lg font-semibold">
                        <CgProfile
                            color="#006638"
                            className="text-lg"
                        />{" "}
                        {customerName}
                    </p>
                    <p className="flex items-center gap-2 text-lg font-semibold">
                        <FaRegAddressCard
                            color="#006638"
                            className="text-lg"
                        />
                        {customerPhone}
                    </p>
                    <p className="flex items-center gap-2 text-lg font-semibold">
                        <MdLocalPhone
                            color="#006638"
                            className="text-lg"
                        />
                        {customerEmail}
                    </p>
                    <p className="flex items-center gap-2 text-lg font-semibold">
                        <CgProfile
                            color="#006638"
                            className="text-lg"
                        />
                        {flatNumber}
                    </p>
                    <p className="flex items-center gap-2 text-lg font-semibold">
                        <MdEmail
                            color="#006638"
                            className="text-lg"
                        />
                        {buildingNumber}
                    </p>
                </div>
                <div className="flex flex-col gap-3 p-2">
                    <p>
                        <span className="text-lg font-semibold">{t("orders:customer.billing")}:</span> {billingAddress}
                    </p>
                    <p>
                        <span className="text-lg font-semibold">{t("orders:customer.shipping")}:</span> {shippingAddress}
                    </p>
                </div>
            </div>
            <div className="mt-4 flex w-full flex-col items-start gap-8 gap-y-2 lg:flex-row lg:gap-y-0">
                <div className="flex w-full flex-col justify-center gap-4 rounded-xl border p-4 lg:w-1/2">
                    <h1 className="text-xl font-semibold">{t("orders:price")}</h1>
                    <div className="flex items-center justify-between p-2">
                        <p className="text-lg font-extrabold text-[#A3A3A3]">{t("orders:productValue")}</p>
                        <p className="text-lg font-bold">{subTotalAfterApplyCoupon}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between p-2">
                        <p className="text-lg font-extrabold text-[#A3A3A3]">{t("orders:discount")}</p>
                        <p className="text-lg font-bold text-red-600">{couponDiscountAmount}</p>
                    </div>
                    <p className="divider divider-vertical"></p>
                    <div className="mt-2 flex items-center justify-between p-2">
                        <p className="text-lg font-extrabold text-[#A3A3A3]">{t("orders:totalAmount")}</p>
                        <p className="text-lg font-bold text-red-600">{total}</p>
                    </div>
                </div>
                <div className="flex min-h-[300px] w-full flex-col gap-4 rounded-xl border p-4 lg:w-1/2">
                    <h1 className="text-xl font-semibold">{t("orders:customerNotes")}</h1>
                    {orderNotes ? (
                        orderNotes
                    ) : (
                        <>
                            <p>{t("orders:noNotes")}</p>
                            <div className="flex items-center justify-center rounded-lg p-2">
                                <img
                                    src="/chat_message.png"
                                    alt="chat_message"
                                    className="h-[120px] w-[120px] rounded-lg border object-cover"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="p-4">
                <div className="mt-4 flex w-full flex-col items-start gap-8 gap-y-2 lg:flex-row lg:gap-y-0">
                    <p className="text-xl font-semibold">{t("orders:orderDelivery")}</p>
                    <p className="flex items-center gap-2 rounded-xl bg-slate-500 p-2 text-lg font-semibold text-white">
                        <MdFireTruck /> {t("orders:orderDeliveryDetails")}
                    </p>
                </div>
                <div className="mt-4 flex w-full flex-col items-start gap-8 gap-y-2 lg:flex-row lg:gap-y-0">
                    <p className="text-xl font-semibold">{t("orders:orderpaymentMethod")}</p>
                    <p className="flex items-center gap-2 rounded-xl bg-[#006638] p-2 text-lg font-semibold text-white">
                        <MdPayments /> {paymentMethod}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomersDetailsInOrders;
