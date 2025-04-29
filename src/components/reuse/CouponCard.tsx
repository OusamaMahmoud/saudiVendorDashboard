import { FaEllipsisV } from "react-icons/fa";

interface Coupon {
    id: string;
    code: string;
    discount: number;
    expiryDate: string;
    maxUses: number;
}

interface Props {
    coupon: Coupon;
    onUpdate: (id: string) => void;
    onDelete: () => void;
}

const CouponCard = ({ coupon, onUpdate, onDelete }: Props) => {
    return (
        <div className="card shadow-xl border border-gray-300 relative p-8 pb-2 pt-10">
            <div className="absolute top-2 right-2 dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-circle btn-ghost">
                    <FaEllipsisV />
                </button>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
                    <li>
                        <button onClick={() => onUpdate(coupon.id)}>Update Coupon</button>
                    </li>
                    <li>
                        <button onClick={onDelete}>Delete Coupon</button>
                    </li>
                </ul>
            </div>

            <div className="card-body text-center">
                <div className="text-lg font-semibold border-dashed border-2 border-gray-400 p-2 rounded">
                    {coupon.code}
                </div>

                <div className="mt-2 text-lg font-bold text-primary">{coupon.discount}% Off</div>

                <div className="flex flex-col items-center">
                    <div className="mt-4 badge badge-outline p-2">
                        Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                    </div>

                    <div className="mt-4 badge badge-neutral p-2">Max Uses: {coupon.maxUses}</div>
                </div>
            </div>
        </div>
    );
};

export default CouponCard;
