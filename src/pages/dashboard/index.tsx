"use client";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { capitalizeString } from "@/libs/utils";
import { getTodos, Todo } from "@/services/firestore.service";
import { useAuthState } from "@/store";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaClock, FaTasks } from "react-icons/fa";
import { MdCheckCircle, MdPending, MdTrendingUp } from "react-icons/md";
export default function Dashboard() {
    const { user } = useAuthState();
    const [tasks, setTasks] = useState<Todo[]>([]);
    const pendingTasks = tasks?.filter((x) => x.status === "pending");
    const completedTasks = tasks?.filter((x) => x.status === "completed");

    const stats = {
        totalTasks: tasks?.length,
        completedTasks: completedTasks.length,
        pendingTasks: pendingTasks.length,
        completionRate:
            tasks.length > 0
                ? Math.round(completedTasks?.length / tasks.length) * 100
                : 0,
    };
    const recentTasks = tasks?.slice(0, 5);

    useEffect(() => {
        getTodos().then((data) => {
            setTasks(data);
        });
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 min-h-[80vh]">
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
                                            {format(
                                                task?.created_at
                                                    ? task.created_at.toDate()
                                                    : new Date(),
                                                "dd MMM yyyy | hh:mm"
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-lg ${
                                        task.status === "completed"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-orange-100 text-orange-800"
                                    }`}
                                >
                                    {capitalizeString(task.status)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
