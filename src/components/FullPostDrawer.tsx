import {Reel} from "../types/Reel";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import {FragDrawer} from "./generic/FragDrawer";

export default function FullPostDrawer(props: {
    open: boolean,
    setOpen: (open: boolean) => void,
    reel: Reel
}) {
    return <FragDrawer {...props} full>
        {
            props.reel && <>
                <div className={"flex flex-col place-items-center"}>
                    <Avatar src={props.reel.pfp} className={"mb-2"}/>
                    <div className={"text-sm"}>{props.reel.author}</div>
                    <div className={"font-bold text-xl"}>{props.reel.title}</div>
                </div>
                <div className={"text-sm flex gap-1 mb-4"}>
                    {props.reel.date.format("DD MMM YYYY")}
                    <div>·</div>
                    {Math.ceil(props.reel.content.trim().split(/\s+/).length / 255.0)} min read
                </div>
                <div className={""}>
                    {
                        props.reel.content.split("\n").map(o => (<>{o}<br/></>))
                    }
                </div>
            </>
        }
    </FragDrawer>;
}
