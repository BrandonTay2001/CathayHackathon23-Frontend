import React from "react";

export default function ClientOnly(props: React.PropsWithChildren<{}>) {
    const [hasMounted, setHasMounted] = React.useState(false);
    React.useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted)
        return <></>;

    return <>{props.children}</>;
}
