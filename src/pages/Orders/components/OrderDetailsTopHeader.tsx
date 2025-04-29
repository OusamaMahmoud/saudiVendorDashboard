import { useTranslation } from "react-i18next";
import { OrderDetails } from "../../../hooks/orders/useFetchOrder";

const OrderDetailsTopHeader = ({ orderDetails }: { orderDetails: OrderDetails }) => {
    const { t } = useTranslation();

    return (
        <div className="mb-2 flex flex-col items-center justify-between p-2 md:flex-row">
            <div className="flex flex-col items-center gap-4 py-2 md:flex-row">
                <div className="flex items-center gap-4 rounded-xl p-4 shadow-md md:flex-row">
                    <p className="text-lg font-semibold">{t("orders:ordersDetailsTableHeaders.orderNumber")}</p>
                    <p>{orderDetails?.orderNumber}</p>
                </div>
                <div className="flex items-center gap-4 rounded-xl p-4 shadow-md md:flex-row">
                    <p className="text-lg font-semibold">{t("orders:ordersDetailsTableHeaders.creationDate")}</p>
                    <p>{orderDetails?.dateCreated}</p>
                </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl md:flex-row">
                <p className="text-lg font-semibold">{t("orders:paymentStatus.status")} :</p>
                <p className="rounded-xl bg-green-400 px-2 py-1 text-lg capitalize">{orderDetails?.orderStatus}</p>
            </div>
        </div>
    );
};

export default OrderDetailsTopHeader;
