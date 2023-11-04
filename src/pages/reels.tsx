import * as React from "react";
import {useRef, useState} from "react";
import {Reel} from "../types/Reel";
import {ReelCard} from "../components/ReelCard";
import Footer from "../components/Footer";
import FullPostDrawer from "../components/FullPostDrawer";
import useFetch from "../utils/useFetch";

export default function Reels() {
    const [postOpened, setPostOpened] = useState(false);
    const [selPost, setSelPost] = useState<Reel | null>(null);

    const {data: posts} = useFetch<Reel[]>("/api/reels");
    const ref = useRef<HTMLDivElement>(null);

    return <div className={"w-screen h-screen relative flex flex-col bg-neutral-900"}>
        <FullPostDrawer open={postOpened} setOpen={setPostOpened} reel={selPost!}/>
        <div
            className={"absolute top-0 w-full p-4 flex place-items-center place-content-center z-10 bg-gradient-to-b from-black/50 via-black/20 to-transparent"}>
            <img src={"/logo-travelmate.svg"} className={"h-8 drop-shadow-xl"}></img>
        </div>
        <div className={"w-full flex-1 overflow-y-scroll snap-y snap-mandatory"} ref={ref}>
            {
                posts && posts.map((o, i) => <ReelCard key={i} post={o} onViewPost={() => {
                    setSelPost(o);
                    setPostOpened(true);
                }}/>)
            }
        </div>
        <Footer/>
    </div>;
}
