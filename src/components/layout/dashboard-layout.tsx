import { useAuthState } from "@/store";
import { PropsWithChildren } from "react";
import Header from "../header";
import Navigate from "../navigate";

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { isLoading, isAuthenticated } = useAuthState();
    if (isLoading) return <p>Loading...</p>;
    if (!isAuthenticated) return <Navigate href="/auth/login" />;

    // render dashboard
    return (
        <div>
            <Header />
            <aside>dashboard sidebar</aside>
            <main>{children}</main>
        </div>
    );
}
