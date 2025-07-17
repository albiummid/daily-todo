"use client";
import { useAuthListener } from "@/services/auth.service";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
    // Listen auth change
    useAuthListener();
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Component {...pageProps} />
        </>
    );
}
