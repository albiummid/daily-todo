"use client";
import TextField from "@/components/ui/text-field";
import { credentialSignIn } from "@/services/auth.service";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineUser } from "react-icons/ai";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        mode: "controlled",
        initialValues: {
            email: "albi.ummid@gmail.com",
            password: "password",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            password: (value) => !value && "Password is required",
        },
    });

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const isValid = form.isValid();
            const { email, password } = form.getValues();
            if (!isValid) throw new Error("Validation failed.");
            await credentialSignIn(email, password);
            // user will be added in authState using authListener
            router.replace("/");
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes("auth/invalid-credential")) {
                    const message = "Invalid credentials";
                    setError(message);
                    return toast.error(message);
                }
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <AiOutlineUser className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Sign in to your account
                    </p>
                </div>

                <form>
                    <div className="space-y-6">
                        <TextField
                            label="Email"
                            icon={
                                <FaEnvelope className="h-5 w-5 text-gray-400" />
                            }
                            type="email"
                            placeholder="Enter your email"
                            {...form.getInputProps("email")}
                        />
                        <TextField
                            icon={<FaLock className="h-5 w-5 text-gray-400" />}
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...form.getInputProps("password")}
                        />
                        {error && (
                            <p className=" text-center text-rose-500">
                                {error}
                            </p>
                        )}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? "Loading..." : "Sign In"}
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don&apos;t have an account?
                            <Link
                                href={"/auth/register"}
                                className="ml-1 text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
