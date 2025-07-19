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
import { useAuthState } from "@/store";
import { useForm } from "@mantine/form";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaClock, FaTrash } from "react-icons/fa";
import { FiCheckCircle, FiPlusCircle } from "react-icons/fi";
import { MdCheck, MdModeEdit } from "react-icons/md";

export default function TodoPage() {
    const { user } = useAuthState();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const form = useForm<{
        title: string;
        description: string;
        status: "pending" | "completed";
        creator_email: string;
    }>({
        initialValues: {
            title: "",
            description: "",
            status: "pending",
            creator_email: user?.email || "",
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
        if (!user?.email) return;
        const data = await getTodos(user?.email);
        setTodos(data);
    };

    useEffect(() => {
        fetchTodos().finally(() => {
            setLoading(false);
        });

        return () => {
            setLoading(true);
            setTodos([]);
        };
    }, [user]);

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
                    <></>
                ) : todos.length === 0 ? (
                    <div className="text-gray-500 text-center">No todos</div>
                ) : (
                    <table className="min-w-full rounded-lg border-l border-r border-b  border-gray-200 overflow-x-auto text-xs lg:text-sm">
                        <thead className=" text-left">
                            <tr className="border border-gray-200">
                                <th className="p-4">Tasks</th>
                                <th className="p-4">Status</th>
                                <th className="hidden p-4  lg:flex min-w-48">
                                    Created At
                                </th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {todos.map((todo, idx) => (
                                <tr
                                    key={todo.id}
                                    className={`${
                                        idx % 2 == 0
                                            ? "bg-gray-white"
                                            : "bg-gray-100"
                                    } `}
                                >
                                    <td className=" p-4 font-medium">
                                        {todo.title}
                                        <p className="font-normal lg:block mt-2">
                                            {todo.description}
                                        </p>
                                    </td>

                                    <td className="">
                                        <span
                                            className={`rounded-lg px-2 py-1 font-semibold ${
                                                todo.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {capitalizeString(todo.status)}
                                        </span>
                                    </td>
                                    <td className="p-4 hidden lg:table-cell">
                                        <span className="">
                                            {todo.created_at &&
                                                format(
                                                    todo.created_at.toDate(),
                                                    "dd MMM yyyy hh:mm a"
                                                )}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="grid grid-cols-3 gap-2 w-20 place-items-center">
                                            <button
                                                hidden={
                                                    todo.status === "completed"
                                                }
                                                className={` text-white bg-green-600 border border-green-600  p-1  rounded-lg cursor-pointer`}
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
                                                className={` text-white bg-yellow-400 border border-yellow-400  p-1  rounded-lg cursor-pointer`}
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
                                                className="bg-indigo-600  text-white  p-1  rounded-lg cursor-pointer"
                                                onClick={() =>
                                                    setEditingId(todo.id)
                                                }
                                            >
                                                <MdModeEdit />
                                            </button>
                                            <button
                                                className="bg-red-600 cursor-pointer p-1 rounded-lg text-white"
                                                onClick={() =>
                                                    handleDelete(todo.id)
                                                }
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </DashboardLayout>
    );
}
