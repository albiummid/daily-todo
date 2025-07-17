"use client";
import TextField from "@/components/ui/text-field";
import {
    credentialSignUp,
    updateUserDisplayName,
} from "@/services/auth.service";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineUser } from "react-icons/ai";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate: {
            name: (value) => !value && "Name is required",
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            password: (value) => {
                if (!value) return "Password is required";
                if (value.length < 6)
                    return "Password must be at least 6 characters";
                return null;
            },
            confirmPassword: (value, values) => {
                if (!value) return "Please confirm your password";
                if (value !== values.password) return "Passwords do not match";
                return null;
            },
        },
    });

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            form.validate();
            const isValid = form.isValid();
            console.log("IS_VALID", isValid);
            const { name, email, password } = form.getValues();
            if (!isValid) throw new Error("Validation failed.");

            // Create user account
            await credentialSignUp(email, password);

            // Update user's display name
            if (name.trim()) {
                await updateUserDisplayName(name.trim());
            }

            // user will be added in authState using authListener
            router.replace("/dashboard");
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes("auth/email-already-in-use")) {
                    const message = "Email already in use";
                    setError(message);
                    return toast.error(message);
                }
                if (error.message.includes("auth/weak-password")) {
                    const message = "Password is too weak";
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
                        Create Account
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Sign up for a new account
                    </p>
                </div>

                <>
                    <div className="space-y-6">
                        <TextField
                            label="Full Name"
                            icon={<FaUser className="h-5 w-5 text-gray-400" />}
                            type="text"
                            placeholder="Enter your full name"
                            {...form.getInputProps("name")}
                        />
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
                        <TextField
                            icon={<FaLock className="h-5 w-5 text-gray-400" />}
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm your password"
                            {...form.getInputProps("confirmPassword")}
                        />
                        {error && (
                            <p className="text-center text-rose-500">{error}</p>
                        )}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? "Loading..." : "Sign Up"}
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?
                            <button
                                onClick={() => {
                                    router.push("/auth/login");
                                }}
                                className="ml-1 text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </>
            </div>
        </div>
    );
}
