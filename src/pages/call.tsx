import * as React from "react";
import {useState} from "react";
import {AppBar, IconButton, Toolbar} from "@mui/material";
import Footer from "../components/Footer";
import {MdCall} from "react-icons/md";

export default function Call() {

    const [page, setPage] = useState<"Home" | "CurrencyExchange">("Home");

    return <div className={"w-screen h-screen relative flex flex-col bg-neutral-900"}>
        <AppBar position="static">
            <Toolbar className={"pr-2"}>
                <div className={"text-xl font-bold flex-1"}>
                    AI Call Center
                </div>
            </Toolbar>
        </AppBar>
        <div className={"w-full flex-1 flex flex-col p-4 gap-4"}>
            <IconButton color={"default"}><MdCall/></IconButton>
        </div>
        <Footer/>
    </div>;
}
