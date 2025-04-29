import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";
import apiClient from "../../utils/apiClient";
import { showToast } from "../../utils/showToast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await apiClient.post("/api/auth/logout");
            console.log("Logout =>", res);
            showToast("Logout Successfully", "success");

            logout();
            localStorage.removeItem("lang");
            navigate("/login");
        } catch (error) {
            console.error("Logout Error =>", error);
            showToast("Logout Failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return { handleLogout, loading };
};

export default useLogout;
