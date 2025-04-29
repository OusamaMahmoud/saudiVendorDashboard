import axios from "axios";
import { useAuthStore } from "../Store/authStore";

const apiClient = axios.create({
    baseURL: "https://ecommerce.backend.tanfeethi.com.sa",
});

apiClient.interceptors.request.use((config) => {
    const { token } = useAuthStore.getState();
    const lang = localStorage.getItem("lang");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (lang) {
        config.headers["Lang"] = lang;
    }
    return config;
});

let isRedirecting = false;

// Handle unauthorized responses & network issues
// apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         console.error("AXIOS ERROR:", error);

//         // Remove token and redirect for both 401 and undefined responses
//         const shouldLogout =
//             !error.response || // Network issue (CORS, connection lost, etc.)
//             error.response.status === 401; // Unauthorized response

//         if (shouldLogout) {
//             localStorage.removeItem("auth-storage");

//             if (!isRedirecting && !window.location.pathname.includes("/login")) {
//                 isRedirecting = true;
//                 window.location.href = "/login";
//             }
//         }

//         return Promise.reject(error);
//     },
// );

export default apiClient;
