// LoadingModal.tsx
import React from "react";

const LoadingModal: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-25">
            <div className="flex flex-col items-center rounded-md bg-white p-6 shadow-md">
                <span className="loading-xl loading loading-dots"></span>
                <p className="mt-4 text-gray-700">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingModal;
