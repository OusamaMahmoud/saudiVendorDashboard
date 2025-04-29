import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import apiClient from "../../utils/apiClient";
import { z } from "zod";
import useLogin from "../../hooks/auth-hooks/useLogin";

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password Must be at least 8 characters" }),
});
type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function Login(): JSX.Element {
    const [user, setUser] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const { mutate, isPending } = useLogin();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validateForm = loginFormSchema.safeParse(user);

        if (!validateForm.success) {
            const fieldErrors: { email?: string; password?: string } = {};

            validateForm.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0] as "email" | "password"] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        mutate(user);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
    };
    return (
        <section className="container mx-auto h-screen">
            <div className="h-full">
                {/* <!-- Left column container with background--> */}
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full"
                            alt="Sample image"
                        />
                    </div>

                    {/* <!-- Right column container --> */}
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                        <form onSubmit={handleSubmit}>
                            {/* <!--Sign in section--> */}
                            <div className="flex flex-row items-center justify-center lg:justify-start">
                                <p className="mb-4 mr-4 text-xl font-bold">Sign in with</p>
                            </div>
                            <div className="mb-6 flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg font-semibold">Email</label>
                                    <input
                                        name="email"
                                        className="input input-bordered"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg font-semibold">Password</label>
                                    <input
                                        name="password"
                                        className="input input-bordered"
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block w-fit rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                    {isPending ? "login..." : "Login"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
