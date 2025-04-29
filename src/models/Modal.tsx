const Modal = ({
    modal_id,
    onConfirm,
    meta: { confirm, label, Cancel },
}: {
    meta: { confirm: string; Cancel: string; label: string };
    modal_id: string;
    onConfirm: () => void;
}) => {
    return (
        <dialog
            id={modal_id}
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="x modal-box">
                <p className="py-4 font-serif text-xl font-bold">{label}</p>
                <div className="modal-action flex items-center gap-2">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn bg-main-color text-white hover:bg-main-color">{Cancel}</button>
                    </form>
                    <button
                        className="btn bg-main-color text-white hover:bg-main-color"
                        onClick={onConfirm}
                    >
                        {confirm}
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default Modal;
