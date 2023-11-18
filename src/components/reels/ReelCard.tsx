import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {ContentCopy, FavoriteBorder, KeyboardArrowRight} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import {useCallback, useRef} from "react";
import {useInView} from "react-intersection-observer";
import {Reel} from "../../types/Reel";
import {MdContentCopy, MdEdit, MdFavoriteBorder, MdNoteAdd} from "react-icons/md";

export function ReelCard(props: {
    post: Reel,
    onViewPost: () => void
}) {
    const ref = useRef<HTMLVideoElement>();
    const {ref: inViewRef, inView} = useInView();
    const setRefs = useCallback(
        (node: HTMLVideoElement) => {
            ref.current = node;
            inViewRef(node);
        },
        [inViewRef],
    );
    // useEffect(() => {
    //     if (inView)
    //         ref.current?.play();
    //     else
    //         ref.current?.pause();
    // }, [inView]);

    return <div
        className={"w-full h-full snap-start flex-1 relative overflow-hidden flex place-items-center place-content-center mb-2"}>
        <video playsInline muted loop ref={setRefs} autoPlay className={"w-full h-full object-cover"}>
            <source src={props.post.video} type="video/mp4"/>
            <source src={props.post.video.replace(".mp4", ".webm")} type="video/webm"/>
        </video>
        <div
            className={"absolute inset-0 bg-gradient-to-t from-black via-transparent p-4 flex flex-col-reverse"}>
            {/*<div className={"font-bold text-2xl"}>hi</div>*/}
            <div className={"flex flex-col gap-2"}>
                <div className={"flex gap-2"}>
                    <Avatar src={props.post.pfp}/>
                    <div>
                        <div
                            className={"text-xs"}>{props.post.author}</div>
                        <div className={"font-bold"}>{props.post.title}</div>
                    </div>
                </div>
                <div className={"text-sm"}>
                    {props.post.content.replaceAll("\n", " ").split(" ").slice(0, 20).join(" ") + "..."}
                </div>
                <div className={"flex place-items-center"}>
                    <Button variant={"outlined"}
                            endIcon={<KeyboardArrowRight/>}
                            className={"flex-1 mr-2"}
                            onClick={props.onViewPost}>
                        View Post
                    </Button>
                    <IconButton><MdFavoriteBorder/></IconButton>
                    <IconButton><MdNoteAdd/></IconButton>
                </div>
            </div>
        </div>
    </div>;
}
