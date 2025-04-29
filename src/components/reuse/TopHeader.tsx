import React from "react";

interface ContainerProps {
    title: string;
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

const TopHeader: React.FC<ContainerProps> = ({ title, description, buttonText, onButtonClick }) => {
    return (
        <div className="flex items-center justify-between py-6">
            <div className="rounded-xl p-4 shadow-xl">
                <h2 className="text-xl font-bold">{title}</h2>
                {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
            </div>

            {buttonText && onButtonClick && (
                <button
                    onClick={onButtonClick}
                    className="rounded bg-green-700 px-4 py-2 text-white transition hover:bg-green-800"
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default TopHeader;
