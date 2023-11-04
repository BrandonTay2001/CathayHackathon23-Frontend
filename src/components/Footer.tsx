import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import {AccountCircle, AutoStories, Edit, HomeRepairService} from "@mui/icons-material";
import * as React from "react";
import {useRouter} from "next/router";

export default function Footer() {
    const router = useRouter();

    const pages = [
        {
            label: "Reels",
            icon: <AutoStories/>,
            href: "/reels"
        },
        {
            label: "Planner",
            icon: <Edit/>,
            href: "/plans"
        },
        {
            label: "Toolbox",
            icon: <HomeRepairService/>,
            href: "/toolbox"
        },
        {
            label: "You",
            icon: <AccountCircle/>,
            href: "/account"
        }
    ];

    const curPage = pages.findIndex(o => o.href === router.pathname);

    return <>
        <BottomNavigation showLabels value={curPage}>
            {
                pages.map((o, i) =>
                    <BottomNavigationAction key={i} label={o.label} icon={o.icon} onClick={() => {
                        router.push(o.href);
                    }}/>)
            }
        </BottomNavigation>
        <div className={"bottom-safe-area bg-[#121212]"}></div>
    </>;
}
