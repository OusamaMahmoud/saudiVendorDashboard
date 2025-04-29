import { useState } from "react";

const BlockSwitch = () => {
    const [isBlocked, setIsBlocked] = useState(false);

    const toggleBlock = () => {
        setIsBlocked((prev) => !prev);
        console.log(isBlocked ? "User Unblocked" : "User Blocked");
    };

    return (
        <label className="flex cursor-pointer items-center gap-3">
            <span className="text-sm font-medium text-gray-700">{isBlocked ? "Blocked ❌" : "Unblocked ✅"}</span>
            <input
                type="checkbox"
                checked={!isBlocked} // Checked = Unblocked, Unchecked = Blocked
                onChange={toggleBlock}
                className="toggle toggle-success"
            />
        </label>
    );
};

export default BlockSwitch;
