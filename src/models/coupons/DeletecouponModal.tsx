const DeleteCouponModal = ({
    modal_id,
    onConfirm,
    onClose,
    meta: { confirm, label, cancel },
}: {
    meta: { confirm: string; cancel: string; label: string };
    modal_id: string;
    onConfirm: () => void;
    onClose: () => void;
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex justify-center items-center">
                    
                </div>
                <p className="text-lg font-semibold">{label}</p>
                <div className="mt-4 flex justify-end gap-3">
                    <button className="px-4 py-2 bg-[#006638] text-white rounded" onClick={onClose}>
                        {cancel}
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={onConfirm}>
                        {confirm}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCouponModal;
