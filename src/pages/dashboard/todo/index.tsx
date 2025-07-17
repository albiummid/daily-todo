"use client";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { capitalizeString } from "@/libs/utils";
import {
    addTodo,
    deleteTodo,
    getTodos,
    Todo,
    updateTodo,
} from "@/services/firestore.service";
import { useForm } from "@mantine/form";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaClock, FaTrash } from "react-icons/fa";
import { FiCheckCircle, FiPlusCircle } from "react-icons/fi";
import { MdCheck, MdModeEdit } from "react-icons/md";

const initialForm = {
    title: "",
    description: "",
    status: "pending" as "pending" | "completed",
};

export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const form = useForm<{
        title: string;
        description: string;
        status: "pending" | "completed";
    }>({
        initialValues: {
            title: "",
            description: "",
            status: "pending",
        },
        validate: {
            title: (v) => !v && "Title is required",
            description: (v) => !v && "Description is required",
            status: (v) =>
                !v
                    ? "Status is required"
                    : !["pending", "completed"].includes(v) &&
                      "Status is not valid",
        },
    });

    const fetchTodos = async () => {
        setLoading(true);
        const data = await getTodos();
        setTodos(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        if (editingId) {
            const todo = todos.find((x) => x.id === editingId);
            form.setValues({
                description: todo?.description,
                status: todo?.status,
                title: todo?.title,
            });
        }
    }, [editingId, todos]);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this todo?")) {
            await deleteTodo(id);
            fetchTodos();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const valid = form.isValid();
        if (!valid) {
            toast.error("All field must be filled");
            return;
        }
        if (editingId) {
            await updateTodo(editingId, form.values);
            toast.success("Task updated.");
        } else {
            await addTodo(form.values);
            toast.success("New task added.");
        }

        await fetchTodos();
        form.reset();
        setEditingId(null);
        setLoading(false);
    };

    return (
        <DashboardLayout>
            <div className="relative space-y-6">
                <form
                    onSubmit={handleSubmit}
                    className=" flex items-center space-x-5 "
                >
                    <div className="w-full">
                        <div className=" flex items-center text-xs space-x-2 p-2 ">
                            <p
                                onClick={() => {
                                    form.setValues({ status: "pending" });
                                }}
                                className={`border border-yellow-400 px-2 py-1 rounded-md cursor-pointer ${
                                    form.values.status === "pending"
                                        ? "bg-yellow-400"
                                        : ""
                                }`}
                            >
                                Pending
                            </p>
                            <p
                                onClick={() => {
                                    form.setValues({ status: "completed" });
                                }}
                                className={`border border-green-400 px-2 py-1 rounded-md cursor-pointer ${
                                    form.values.status === "completed"
                                        ? "bg-green-400"
                                        : ""
                                }`}
                            >
                                Completed
                            </p>
                        </div>
                        <div className="flex items-center space-x-5">
                            <div
                                className={`w-full divide-y  divide-gray-200 border border-gray-200 rounded-lg ${
                                    editingId ? "border-indigo-400" : ""
                                }`}
                            >
                                <input
                                    autoFocus={true}
                                    required
                                    placeholder="Give a title for your todo."
                                    className=" text-xs p-2 w-full outline-none"
                                    {...form.getInputProps("title")}
                                />
                                <textarea
                                    required
                                    placeholder="Your most important todo's description here."
                                    className="text-xs p-2  w-full outline-none"
                                    {...form.getInputProps("description")}
                                />
                            </div>
                            <button type="submit">
                                {editingId ? (
                                    <FiCheckCircle
                                        size={40}
                                        className="text-indigo-600 cursor-pointer"
                                    />
                                ) : (
                                    <FiPlusCircle
                                        size={40}
                                        className="text-gray-400 cursor-pointer"
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                </form>
                {loading ? (
                    <div>Loading...</div>
                ) : todos.length === 0 ? (
                    <div className="text-gray-500 text-center">No todos</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full rounded-lg border-l border-r border-b border-gray-200">
                            <thead>
                                <tr className="border border-gray-200 rounded-lg py-10">
                                    <th className="py-2 px-4 text-left">
                                        Tasks
                                    </th>

                                    <th className="py-2 lg:px-4 text-left">
                                        Status
                                    </th>
                                    <th className="py-2 px-4 text-left  hidden lg:block">
                                        Created At
                                    </th>
                                    <th className="py-2 px-4 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.map((todo, idx) => (
                                    <tr
                                        key={todo.id}
                                        className={
                                            idx % 2 == 0
                                                ? "bg-gray-white"
                                                : "bg-gray-100" + " "
                                        }
                                    >
                                        <td className="py-2 px-4 font-medium text-xs lg:text-base">
                                            {todo.title}
                                            <p className="font-normal lg:block mt-2">
                                                {todo.description}
                                            </p>
                                        </td>

                                        <td className="lg:px-4 text-xs lg:text-base ">
                                            <span
                                                className={`px-2 py-2 rounded-lg text-xs font-semibold ${
                                                    todo.status === "completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {capitalizeString(todo.status)}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4  hidden lg:flex items-center translate-y-1/2 ">
                                            {todo.created_at &&
                                                todo.created_at instanceof
                                                    Timestamp &&
                                                format(
                                                    todo.created_at.toDate(),
                                                    "dd MMM yyyy | hh:mm a"
                                                )}
                                        </td>
                                        <td className="py-2 px-4 text-center ">
                                            <button
                                                hidden={
                                                    todo.status === "completed"
                                                }
                                                className={` text-white bg-green-600 border border-green-600  p-1  rounded-lg cursor-pointer mr-3 `}
                                                onClick={async () => {
                                                    await updateTodo(todo.id, {
                                                        status: "completed",
                                                    });
                                                    toast.success(
                                                        `Task: ${todo.title} - completed.`
                                                    );
                                                    fetchTodos();
                                                }}
                                            >
                                                <MdCheck />
                                            </button>
                                            <button
                                                hidden={
                                                    todo.status === "pending"
                                                }
                                                className={` text-white bg-yellow-400 border border-yellow-400  p-1  rounded-lg cursor-pointer mr-3 `}
                                                onClick={async () => {
                                                    await updateTodo(todo.id, {
                                                        status: "pending",
                                                    });
                                                    toast.success(
                                                        `Task: ${todo.title} - Pending.`
                                                    );
                                                    fetchTodos();
                                                }}
                                            >
                                                <FaClock />
                                            </button>
                                            <button
                                                className="bg-indigo-600  text-white  p-1  rounded-lg cursor-pointer mr-3"
                                                onClick={() =>
                                                    setEditingId(todo.id)
                                                }
                                            >
                                                <MdModeEdit />
                                            </button>
                                            <button
                                                className="text-red-600 cursor-pointer"
                                                onClick={() =>
                                                    handleDelete(todo.id)
                                                }
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
