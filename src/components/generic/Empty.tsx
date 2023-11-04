import Avatar from "@mui/material/Avatar";
import {RemoveCircle} from "@mui/icons-material";

export default function Empty(props: {
    desc: string
}) {
    return <div className={"w-full h-full flex flex-col place-items-center place-content-center p-4"}>
        <Avatar>
            <RemoveCircle color={"action"}/>
        </Avatar>
        <div className={"font-bold text-2xl mt-4"}>Empty</div>
        <div>{props.desc}</div>
    </div>;
}
