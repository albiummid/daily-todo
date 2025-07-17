"use client";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { useAuthState } from "@/store";
import { useRouter } from "next/router";
import { FaClock, FaTasks } from "react-icons/fa";
import {
    MdAdd,
    MdCalendarToday,
    MdCheckCircle,
    MdPending,
    MdTrendingUp,
} from "react-icons/md";

export default function Dashboard() {
    const { user } = useAuthState();
    const router = useRouter();

    // Mock data - replace with real data from your todo service
    const stats = {
        totalTasks: 12,
        completedTasks: 8,
        pendingTasks: 4,
        completionRate: 67,
    };

    const recentTasks = [
        {
            id: 1,
            title: "Complete project documentation",
            status: "completed",
            date: "2025-06-15",
        },
        {
            id: 2,
            title: "Review code changes",
            status: "pending",
            date: "2025-06-16",
        },
        {
            id: 3,
            title: "Prepare presentation slides",
            status: "completed",
            date: "2025-06-17",
        },
        {
            id: 4,
            title: "Update dependencies",
            status: "pending",
            date: "2025-06-18",
        },
    ];

    const quickActions = [
        {
            title: "Add New Task",
            icon: <MdAdd className="w-6 h-6" />,
            href: "dashboard/todo?new=true",
        },
        {
            title: "View All Tasks",
            icon: <FaTasks className="w-6 h-6" />,
            href: "dashboard/todo",
        },
        {
            title: "Today's Tasks",
            icon: <MdCalendarToday className="w-6 h-6" />,
            href: "dashboard/todo?filter=today",
        },
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        {getGreeting()},{" "}
                        {user?.displayName ||
                            user?.email?.split("@")[0] ||
                            "User"}
                        !
                    </h1>
                    <p className="text-indigo-100">
                        Welcome back to your dashboard. Here&apos;s what&apos;s
                        happening with your tasks today.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Tasks
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.totalTasks}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <FaTasks className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Completed
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.completedTasks}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <MdCheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Pending
                                </p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {stats.pendingTasks}
                                </p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-full">
                                <MdPending className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Completion Rate
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {stats.completionRate}%
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-full">
                                <MdTrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    router.push(action.href);
                                }}
                                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                            >
                                <div className="text-indigo-600">
                                    {action.icon}
                                </div>
                                <span className="font-medium text-gray-700">
                                    {action.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Recent Tasks
                    </h2>
                    <div className="space-y-4">
                        {recentTasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`p-2 rounded-full ${
                                            task.status === "completed"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-orange-100 text-orange-600"
                                        }`}
                                    >
                                        {task.status === "completed" ? (
                                            <MdCheckCircle className="w-5 h-5" />
                                        ) : (
                                            <FaClock className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div>
                                        <p
                                            className={`font-medium ${
                                                task.status === "completed"
                                                    ? "text-gray-500 line-through"
                                                    : "text-gray-900"
                                            }`}
                                        >
                                            {task.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {task.date}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        task.status === "completed"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-orange-100 text-orange-800"
                                    }`}
                                >
                                    {task.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
