import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";
import Layout from "../../routes/layout";

const ProtectedRoute = () => {
    const token = useAuthStore((state) => state.token); // ✅ Get token from Zustand

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
            />
        ); // ✅ Redirect if no token
    }

    return <Layout />; // ✅ Render protected pages
};

export default ProtectedRoute;
