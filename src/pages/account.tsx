import * as React from "react";
import {useState} from "react";
import {AppBar, Toolbar} from "@mui/material";
import Footer from "../components/Footer";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import {AccountCircle} from "@mui/icons-material";

export default function Account() {

    return <div className={"w-screen h-screen relative flex flex-col bg-neutral-900"}>
        <AppBar position="static">
            <Toolbar className={"pr-2"}>
                <div className={"text-xl font-bold flex-1"}>
                    Toolbox
                </div>
            </Toolbar>
        </AppBar>
        <div className={"w-full flex-1 flex flex-col p-4 gap-4"}>
            <Card className={"p-4 mb-auto"}>
                <div className={"flex gap-4"}>
                    <AccountCircle className={"text-[48px]"}/>
                    <div>
                        <div className={"text-xl font-bold"}>Example User</div>
                        <div className={"text-sm"}>Joined 10 Nov 2022</div>
                    </div>
                </div>
            </Card>
            <Button variant={"contained"} href={"/login"}>Logout</Button>
        </div>
        <Footer/>
    </div>;
}
