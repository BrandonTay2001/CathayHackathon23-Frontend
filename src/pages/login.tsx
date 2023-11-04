import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Login() {
    return <div className={"w-screen h-screen"}>
        <video autoPlay muted loop className={"w-full h-full absolute inset-0 object-cover"}>
            <source src="/3198087859.mp4" type="video/mp4"/>
        </video>
        <div
            className={"absolute w-screen h-screen bg-black/50 flex flex-col place-items-center place-content-center gap-2 p-4"}>
            <img className={"w-32"} src={"/logo.png"}/>
            <div className={"text-sm"}>
                Plan Your Next Adventure
            </div>
            <div className={"h-8"}/>
            <TextField className={"w-full"} label="Username" variant="outlined" type={"email"}/>
            <TextField className={"w-full"} label="Password" variant="outlined" type={"password"}/>
            <div className={"h-8"}/>
            <Button className={"w-full"} variant="contained" href={"/reels"}>Login</Button>
            <div className={"flex text-xs gap-4 mt-2"}>
                <div>Forgot or retrieve password</div>
            </div>
            <div className={"h-16"}/>
            <div className={"flex place-items-center gap-2 opacity-50"}>
                <div className={"w-32 h-[1px] bg-white"}/>
                <div className={"text-xs"}>by</div>
                <div className={"w-32 h-[1px] bg-white"}/>
            </div>
            <img className={"w-40"} src={"/cx-logo-white.png"}/>
        </div>
    </div>;
}
