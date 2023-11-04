import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import classNames from "classnames";

export function FragDrawer(props: React.PropsWithChildren<{
    open: boolean,
    setOpen: (open: boolean) => void
    full?: boolean
}>): React.ReactNode {
    return <SwipeableDrawer
        anchor="bottom"
        open={props.open}
        onOpen={() => props.setOpen(true)}
        onClose={() => props.setOpen(false)}
        disableSwipeToOpen={true}
        style={{zIndex: 1200}}>
        <div
            className={classNames(
                "w-full rounded-t bg-neutral-700 flex flex-col p-4",
                {"h-[calc(100vh-54px)]": props.full}
            )}>
            <div className={"w-full mb-4 flex place-items-center place-content-center"}>
                <div className={"h-1.5 w-8 rounded-full bg-white"}/>
            </div>
            {
                props.full && <div className={"w-full flex-1 overflow-scroll"}>
                    <div className={"flex flex-col w-full place-items-center place-content-around gap-4"}>
                        {props.children}
                    </div>
                </div>
            }
            {
                !props.full && <div className={"w-full flex flex-col place-content-around gap-4"}>
                    {props.children}
                </div>
            }
        </div>
        <div className={"bottom-safe-area bg-neutral-700"}></div>
    </SwipeableDrawer>;
}
