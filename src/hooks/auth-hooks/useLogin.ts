import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import apiClient from "../../utils/apiClient";
import { showToast } from "../../utils/showToast";
import handlingErrorOnStatusCode from "../../utils/handlingErrorOnStatusCode";
import { useAuthStore } from "../../Store/authStore";
import { useNavigate } from "react-router-dom";

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password Must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface User {
    id: number;
    name: string;
    email: string;
    image: string | null;
    access_token: string;
}

interface LoginResponse {
    data: User[];
    status: string;
    error: string;
    code: number;
}

const addUser = async (formData: LoginFormValues) => {
    const res = await apiClient.post("/api/auth/login", formData);
    return res.data;
};

const useLogin = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();
    return useMutation<LoginResponse, Error, LoginFormValues>({
        mutationFn: addUser,
        onSuccess: (userDataResponse) => {
            login(userDataResponse.data[0], userDataResponse.data[0].access_token);
            // Show a success message
            showToast("Successfully Logged In!", "success");

            navigate("/"); // Redirect to dashboard
        },
        onError: (error: unknown) => {
            // Show a user-friendly error message
            showToast(handlingErrorOnStatusCode(error), "error");
        },
    });
};

export default useLogin;
