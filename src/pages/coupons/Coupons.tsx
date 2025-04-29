import { useState } from "react";
import useFetchCoupons from "../../hooks/coupons/coupons";
import CouponCard from "../../components/reuse/CouponCard";
import useDeleteCoupon from "../../hooks/coupons/DeleteCoupon";
import AddCouponModal from "../../models/coupons/AddcouponModal";
import TopHeader from "../../components/reuse/TopHeader";
import UpdateCouponModal from "../../models/coupons/Updatecouponmodal";
import DeleteCouponModal from "../../models/coupons/DeletecouponModal";

const Coupons = () => {
    const { data: coupons, isLoading, error, refetch } = useFetchCoupons();
    const deleteCouponMutation = useDeleteCoupon();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
    const [deleteCouponId, setDeleteCouponId] = useState<string | null>(null);

    const handleUpdate = (id: string) => {
        setSelectedCouponId(Number(id));
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        setDeleteCouponId(id);
        setIsDeleteModalOpen(true);
    };
    
    const handleConfirmDelete = () => {
        if (deleteCouponId) {
            deleteCouponMutation.mutate(deleteCouponId, {
                onSuccess: () => {
                    refetch();
                    setIsDeleteModalOpen(false);
                    setDeleteCouponId(null);
                },
                onError: (error) => {
                    console.error("Failed to delete coupon:", error);
                    setIsDeleteModalOpen(false);
                },
            });
        }
    };

    if (isLoading) return <div>Loading coupons...</div>;
    if (error) return <div>Error loading coupons</div>;

    return (
        <div>
            <TopHeader
                title="Coupon Sale"
                buttonText="Add Coupon Sale"
                onButtonClick={() => setIsAddModalOpen(true)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons?.map((coupon) => (
                    <CouponCard
                        key={coupon.id}
                        coupon={coupon}
                        onUpdate={() => handleUpdate(coupon.id)}
                        onDelete={() => handleDeleteClick(coupon.id)}
                    />
                ))}
            </div>

            {isAddModalOpen && (
                <AddCouponModal
                    modal_id="add-coupon-modal"
                    meta={{ confirm: "إضافة", Cancel: "إلغاء", label: "إضافة كوبون جديد" }}
                    onClose={() => setIsAddModalOpen(false)}
                    refetch={refetch}
                />
            )}

            {isUpdateModalOpen && selectedCouponId !== null && (
                <UpdateCouponModal
                    modal_id="update-coupon-modal"
                    couponId={selectedCouponId}
                    meta={{ confirm: "تحديث", Cancel: "إلغاء", label: "تحديث كوبون" }}
                    onClose={() => setIsUpdateModalOpen(false)}
                    refetch={refetch}
                />
            )}

{isDeleteModalOpen && deleteCouponId && (
    <DeleteCouponModal
        modal_id="delete-coupon-modal"
        meta={{ confirm: "حذف", cancel: "إلغاء", label: "هل أنت متأكد أنك تريد حذف هذا الكوبون؟" }}
        onConfirm={handleConfirmDelete}
        onClose={() => setIsDeleteModalOpen(false)}
    />
)}



        </div>
    );
};

export default Coupons;
