import React, { useState } from "react";

const OrdersStatusFilterItem = ({
    label,
    totOrdersNo,
    handleClickBtn,
    isSelected,
}: {
    label: string;
    totOrdersNo: string;
    handleClickBtn: () => void;
    isSelected: boolean;
}) => {
    return (
        <div
            className="my-4"
            onClick={() => {
                handleClickBtn();
            }}
        >
            <div
                className={`flex cursor-pointer items-center gap-2 border-b-[#0066384D] font-medium ${isSelected && "border-b-[#006638] font-bold"} border-b-2 pb-2`}
            >
                <p className={`text-[#0066384D] ${isSelected && "text-[#006638]"}`}>{label}</p>
                <p
                    className={`opacity-0 ${isSelected && "bg-[#006638] opacity-100"} flex h-7 w-7 items-center justify-center rounded-full text-[10px] text-white`}
                >
                    {totOrdersNo}
                </p>
            </div>
        </div>
    );
};

export default OrdersStatusFilterItem;
