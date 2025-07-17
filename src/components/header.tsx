"use client";
import { firebaseAuth } from "@/libs/firebase";
import { useAuthState } from "@/store";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineUser } from "react-icons/ai";
import { FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { MdCheckCircle, MdDashboard } from "react-icons/md";

export default function Header() {
    const router = useRouter();
    const { user } = useAuthState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(firebaseAuth);
            toast.success("Logged out successfully");
            router.push("/auth/login");
        } catch (error) {
            toast.error("Failed to logout");
            console.error("Logout error:", error);
        }
    };

    const navigationLinks = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <MdDashboard className="w-5 h-5" />,
        },
        {
            name: "Todo",
            href: "/todo",
            icon: <MdCheckCircle className="w-5 h-5" />,
        },
    ];

    if (!user) {
        return null;
    }

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                        D
                                    </span>
                                </div>
                                <span className="text-xl font-semibold text-gray-900">
                                    Daily Todo
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navigationLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => router.push(link.href)}
                                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-3">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    {user.displayName || user.email}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full"
                                    />
                                ) : (
                                    <AiOutlineUser className="w-5 h-5 text-indigo-600" />
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="hidden md:flex items-center space-x-2 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            <FaSignOutAlt className="w-4 h-4" />
                            <span>Logout</span>
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                        >
                            {isMenuOpen ? (
                                <FaTimes className="w-5 h-5" />
                            ) : (
                                <FaBars className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                            {navigationLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => {
                                        router.push(link.href);
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left"
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </button>
                            ))}

                            {/* Mobile User Info */}
                            <div className="flex items-center space-x-3 px-3 py-2 border-t border-gray-200 mt-4">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <AiOutlineUser className="w-5 h-5 text-indigo-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        {user.displayName || user.email}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Mobile Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex flex-row justify-center bg-red-200 items-center space-x-3 text-red-700 hover:text-red-800 hover:bg-red-300 px-3 py-2 rounded-md text-base font-medium transition-colors w-full cursor-pointer mt-10"
                            >
                                <FaSignOutAlt className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
