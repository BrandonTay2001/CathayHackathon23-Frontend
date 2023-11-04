import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Custom404() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 1000);
    }, []);

    return <div className={"font-mono"}>Error. Redirecting to index...</div>;
}
