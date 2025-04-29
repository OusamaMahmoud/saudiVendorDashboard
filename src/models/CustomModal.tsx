import React from "react";

interface ModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null; // Only render if open

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onCancel} // Optionally close modal on overlay click
            />
            {/* Modal Content */}
            <div className="relative z-10 w-80 rounded bg-white p-6 shadow-md">
                <p className="mb-4 text-gray-800">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Okay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
