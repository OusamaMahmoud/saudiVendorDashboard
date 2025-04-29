import React from "react";
import { useTranslation } from "react-i18next";

const HeaderOne = ({ orderNumber }: { orderNumber: string }) => {
    const { t } = useTranslation();
    return (
        <div className="rounded-lg p-4 shadow-md">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">{t("orders:ordersDetailsHeader")}</h2>
            <p className="text-gray-600">
                <span className="font-medium">{t("orders:orderNo")}</span> {orderNumber}
            </p>
        </div>
    );
};

export default HeaderOne;
