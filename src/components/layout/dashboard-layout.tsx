import Header from "@/components/header";
import Navigate from "@/components/navigate";
import { firebaseAuth } from "@/libs/firebase";
import { useAuthState } from "@/store";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";
import LoadingSpinner from "../loading-spinner";

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { isLoading, isAuthenticated } = useAuthState();
    const pathname = usePathname();
    const router = useRouter();

    if (isLoading) return <LoadingSpinner />;

    if (!isAuthenticated) return <Navigate href="/auth/login" />;

    const sidebarLinks = [
        {
            name: "Dashboard",
            href: "/dashboard",
        },
        {
            name: "Todo List",
            href: "/dashboard/todo",
        },
    ];

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

    // render dashboard
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto lg:px-8 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className=" hidden min-w-1/5 sticky top-5  bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-[85vh] lg:flex flex-col justify-between min-h-[400px]">
                        <div>
                            <nav className="space-y-2">
                                {sidebarLinks.map((link) => {
                                    const isActive =
                                        link.href === "/dashboard"
                                            ? pathname === "/dashboard"
                                            : pathname.startsWith(link.href);
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                isActive
                                                    ? "bg-indigo-50 text-indigo-700 border-indigo-600 border-l-4"
                                                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 w-full mt-8 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-2 rounded-md text-sm font-medium transition-colors justify-center"
                        >
                            <FaSignOutAlt className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </aside>
                    {/* Main Content */}
                    <main className="flex-1 bg-white rounded-lg lg:shadow-sm lg:border border-gray-200 p-2 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
