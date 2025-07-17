import Header from "@/components/header";
import Navigate from "@/components/navigate";
import { useAuthState } from "@/store";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { isLoading, isAuthenticated } = useAuthState();
    if (isLoading) return <p>Loading...</p>;
    if (!isAuthenticated) return <Navigate href="/auth/login" />;

    // render dashboard
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Dashboard
                            </h2>
                            <nav className="space-y-2">
                                <a
                                    href="/dashboard"
                                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                >
                                    Overview
                                </a>
                                <a
                                    href="/todo"
                                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                >
                                    Todo List
                                </a>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
