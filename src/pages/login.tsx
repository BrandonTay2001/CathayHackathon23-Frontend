import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {ArrowRight, ChevronRight} from "@mui/icons-material";

export default function Login() {
    return <div className={"w-screen h-screen"}>
        <video className={"w-full h-full absolute inset-0 object-cover"}
               autoPlay={true}
               muted={true}
               loop={true}
               controls={false}
               disablePictureInPicture={true}
               disableRemotePlayback={true}
               playsInline={true}
        >
            <source src="/bg_compressed.mp4" type="video/mp4"/>
        </video>
        <div
            className={"absolute w-screen h-screen bg-black/50 flex flex-col place-items-center place-content-center gap-2 p-4"}>
            <img className={"w-32"} src={"/logo-travelmate.svg"}/>
            <div className={"text-sm"}>
                Plan Your Next Adventure
            </div>
            <div className={"h-8"}/>
            <TextField className={"w-full"} label="Username" variant="outlined" type={"email"}/>
            <TextField className={"w-full"} label="Password" variant="outlined" type={"password"}/>
            <div className={"h-8"}/>
            <Button className={"w-full"} variant="contained" href={"/reels"}>Login</Button>
            <div className={"flex text-xs gap-2 mt-2 text-neutral-300"}>
                <div>Register</div>
                <div>·</div>
                <div>Forgot Password</div>
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
