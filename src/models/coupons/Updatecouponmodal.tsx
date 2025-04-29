import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FaCalendarAlt } from "react-icons/fa";
import { useUpdateCoupon, useGetCouponById } from "../../hooks/coupons/UpdateCoupon";

interface OptionType {
    value: string;
    label: string;
}

const UpdateCouponModal = ({
    modal_id,
    couponId,
    meta: { label, Cancel },
    onClose,
    refetch,
}: {
    modal_id: string;
    couponId: number;
    meta: { confirm: string; Cancel: string; label: string };
    onClose: () => void;
    refetch: () => void;
}) => {
    const { mutate, error } = useUpdateCoupon();
    const { data: couponData } = useGetCouponById(couponId);

    const [couponType, setCouponType] = useState<OptionType | null>(null);
    const [couponCode, setCouponCode] = useState("");
    const [couponValue, setCouponValue] = useState("");
    const [discountType, setDiscountType] = useState<OptionType | null>(null);
    const [minCartValue, setMinCartValue] = useState("");
    const [maxUsage, setMaxUsage] = useState("");
    const [usagePerUser, setUsagePerUser] = useState("");
    const [assignedUser, setAssignedUser] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const couponOptions: OptionType[] = [
        { value: "firstOrder", label: "طلب أول" },
        { value: "general", label: "عام" },
        { value: "freeShipping", label: "شحن مجاني" },
    ];

    const discountOptions: OptionType[] = [
        { value: "percentage", label: "خصم %" },
        { value: "fixed", label: "خصم ثابت" },
    ];

    useEffect(() => {
        if (couponData) {
            setCouponType(couponOptions.find((opt) => opt.value === couponData.type) || null);
            setCouponCode(couponData.code);
            setCouponValue(String(couponData.value));
            setDiscountType(discountOptions.find((opt) => opt.value === couponData.discountType) || null);
            setMinCartValue(String(couponData.minCartTotal));
            setMaxUsage(String(couponData.maxUses));
            setUsagePerUser(String(couponData.userUsesLimit));
            setAssignedUser(couponData.userId ? String(couponData.userId) : "");
            setExpiryDate(new Date(couponData.expiresAt).toISOString().split("T")[0]);
        }
    }, [couponData]);
    
    const handleConfirm = () => {
        if (!couponType || !discountType || !couponCode || !couponValue) {
            alert("يرجى ملء جميع الحقول المطلوبة");
            return;
        }

        const updatedCouponData = {
            id: couponId,
            code: couponCode,
            type: couponType.value as "general" | "firstOrder" | "freeShipping",
            discount_type: discountType.value as "fixed" | "percentage",
            value: Number(couponValue),
            user_id: assignedUser ? Number(assignedUser) : 0,
            min_cart_total: Number(minCartValue) || 0,
            max_uses: Number(maxUsage) || 0,
            user_uses_limit: Number(usagePerUser) || 0,
            expires_at: expiryDate,
            is_active: 1,
        };

        mutate(updatedCouponData, {
            onSuccess: () => {
                refetch();
                onClose();
            },
        });
    };

    return (
        <dialog id={modal_id} className="modal modal-bottom sm:modal-middle" open>
            <div className="modal-box bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-bold mb-8 text-right">{label}</p>

                <div className="mb-8">
                    <label className="block text-gray-700 mb-6 text-right">نوع الكوبون</label>
                    <Select options={couponOptions} value={couponType} onChange={setCouponType} className="text-right" />
                </div>

                <div className="mb-8">
                    <label className="block text-gray-700 mb-6 text-right">كود الكوبون</label>
                    <input
                        type="text"
                        className="border p-2 rounded w-full bg-white text-gray-700"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                        <label className="block text-gray-700 mb-6 text-right">قيمة الكوبون</label>
                        <input
                            type="number"
                            className="border p-2 rounded w-full bg-white text-gray-700"
                            value={couponValue}
                            onChange={(e) => setCouponValue(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-6 text-right">نوع الخصم</label>
                        <Select options={discountOptions} value={discountType} onChange={setDiscountType} className="text-right" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                        <label className="block text-gray-700 mb-6 text-right">الحد الأدنى لسلة المشتريات</label>
                        <input
                            type="number"
                            className="border p-2 rounded w-full bg-white text-gray-700"
                            value={minCartValue}
                            onChange={(e) => setMinCartValue(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-6 text-right">عدد مرات الاستخدام</label>
                        <input
                            type="number"
                            className="border p-2 rounded w-full bg-white text-gray-700"
                            value={maxUsage}
                            onChange={(e) => setMaxUsage(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                        <label className="block text-gray-700 mb-6 text-right">الحد الأقصى لكل مستخدم</label>
                        <input
                            type="number"
                            className="border p-2 rounded w-full bg-white text-gray-700"
                            value={usagePerUser}
                            onChange={(e) => setUsagePerUser(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-6 text-right">مستخدم مخصص</label>
                        <input
                            type="text"
                            className="border p-2 rounded w-full bg-white text-gray-700"
                            value={assignedUser}
                            onChange={(e) => setAssignedUser(e.target.value)}
                        />
                    </div>
                </div>

                <div className="relative cursor-pointer mb-8">
                    <label className="block text-gray-700 mb-6 text-right">تاريخ انتهاء الصلاحية</label>
                    <input
                        type="date"
                        className="border p-2 pr-10 rounded w-full bg-white text-gray-700 cursor-pointer"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                    <FaCalendarAlt className="absolute top-16 right-3 text-[#006638]" />
                </div>

                {error && <p className="text-red-500 text-right">حدث خطأ أثناء إضافة الكوبون</p>}

                <div className="modal-action flex justify-around mb-8">
                    <form method="dialog">
                        <button className="border border-gray-400 text-gray-700 px-6 py-2 rounded hover:bg-gray-100" onClick={onClose}>
                            {Cancel}
                        </button>
                    </form>
                    <button
                        className="bg-[#006638] text-white px-6 py-2 rounded hover:bg-[#2b6d4f] disabled:opacity-50"
                        onClick={handleConfirm}
                    >
                        أضف
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default UpdateCouponModal;
