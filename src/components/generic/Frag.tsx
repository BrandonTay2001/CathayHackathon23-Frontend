import {AppBar, Dialog, IconButton, Slide, Toolbar} from "@mui/material";
import {Close} from "@mui/icons-material";
import * as React from "react";
import {TransitionProps} from "@mui/material/transitions";
import classNames from "classnames";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Frag(props: React.PropsWithChildren<{
    title?: string,
    open: boolean,
    setOpen: (open: boolean) => void
    className?: string,
    noPad?: boolean,
    buttons?: React.ReactNode
}>) {
    return <Dialog fullScreen
                   open={props.open}
                   onClose={() => props.setOpen(false)}
                   TransitionComponent={Transition}
                   style={{zIndex: 1000}}>
        <AppBar position="relative" style={{zIndex: 900}}>
            <Toolbar className={"pr-2"}>
                <div className={"text-xl font-bold flex-1"}>
                    {props.title}
                </div>
                {
                    props.buttons
                }
                <IconButton size={"large"}
                            onClick={() => props.setOpen(false)}>
                    <Close/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <div
            className={classNames(
                "flex-1 overflow-scroll flex flex-col place-items-stretch gap-4 bg-neutral-900",
                !props.noPad && "p-4",
                props.className
            )}>
            {props.children}
        </div>
    </Dialog>;
}
