import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Navigate({ href }: { href: string }) {
    const router = useRouter();

    useEffect(() => {
        router.replace(href);
    }, [href, router]);

    return null;
}
