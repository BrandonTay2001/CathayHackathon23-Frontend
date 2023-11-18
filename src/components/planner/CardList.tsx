import {Plan} from "../../types/Plan";
import PlaceTags from "../../data/PlaceTags";
import Card from "@mui/material/Card";
import * as React from "react";
import {useMemo} from "react";
import moment from "moment/moment";
import {ButtonGroup, IconButton} from "@mui/material";
import {
    MdAdd,
    MdAirplaneTicket, MdDelete,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdMoveUp,
    MdRemove, MdSearch,
    MdTimer
} from "react-icons/md";
import Button from "@mui/material/Button";
import {PlanEvent} from "../../types/PlanEvent";

const EventCard = (props: {
    event: PlanEvent
}) => {
    const e = props.event;

    const tag = PlaceTags.find(o => o.otmTags.find(t => e.tags.includes(t)))!;
    const decimalHash = (msg: string) => {
        let sum = 0;
        for (let i = 0; i < msg.length; i++)
            sum += (i + 1) * msg.codePointAt(i)! / (1 << 8);
        return sum % 1;
    };
    const canUseAsiaMiles = decimalHash(e.name) < 0.2;

    return <div className={"flex gap-2"}>
        <div className={"text-xs flex flex-col place-items-center place-content-center"}>
            <IconButton size={"small"}><MdKeyboardArrowUp/></IconButton>
            <div>{e.from.format("HH:mm")}</div>
            <div>|</div>
            <div>{e.to.format("HH:mm")}</div>
            <IconButton size={"small"}><MdKeyboardArrowDown/></IconButton>
        </div>
        <div className={"flex-1 flex flex-col border border-white/20 bg-white/10 border-solid rounded overflow-hidden"}>
            {
                canUseAsiaMiles &&
                <div
                    className={"flex place-items-baseline text-xs gap-2 p-2 bg-gradient-to-br from-yellow-300 to-yellow-800 text-black/75"}>
                    <img src={"asia-miles-logo.png"}
                         className={"h-4 w-16 object-contain"}/>
                    <div className={"text-xs"}>can be used here</div>
                </div>
            }
            <div className={"p-2 flex flex-col flex-1"}>
                <div className={"font-bold text-sm"}>{e.name}</div>
                {/*<div className={"flex place-items-center text-xs gap-0.5 opacity-75 mb-2"}>*/}
                {/*    {tag.icon}*/}
                {/*    {tag.tag}*/}
                {/*</div>*/}
                <div className={"flex place-items-center text-xs gap-0.5 opacity-75 mb-2"}>
                    {e.notes}
                </div>
                <div
                    className={"ml-auto mt-auto flex place-items-center text-xs opacity-75 gap-2"}>
                    <div
                        className={"border border-white/10 border-solid rounded flex place-items-center"}>
                        <IconButton size={"small"}><MdRemove/></IconButton>
                        <div className={"w-[1px] h-6 bg-white/10 mr-2"}></div>
                        <div className={"w-16 flex place-items-center place-content-center"}>
                            {`${moment.duration(e.to.diff(e.from)).asHours()} Hrs`}
                        </div>
                        <div className={"w-[1px] h-6 bg-white/10 ml-2"}></div>
                        <IconButton size={"small"}><MdAdd/></IconButton>
                    </div>
                    <IconButton size={"small"}><MdDelete/></IconButton>
                </div>
            </div>
        </div>
    </div>;
};

export default function CardList(props: {
    plan: Plan
}) {

    const days = useMemo<moment.Moment[]>(() => {
        if (!props.plan)
            return [];
        const d = [];
        let s = props.plan.start.clone();
        while (s.isSameOrBefore(props.plan.end)) {
            d.push(s.clone());
            s.add(1, "day");
        }
        return d;
    }, [props.plan]);

    return <div className={"p-2 flex flex-col gap-2"}>
        <div className={"bg-gradient-to-br from-[#006b6e] to-white/10 p-4 rounded"}>
            <img className={"w-32"} src={"cx-logo-white.png"}/>
            <div className={"text-sm"}>Get tickets to {props.plan.city.name} for as low as HKD1,600</div>
            <div className={"h-4"}></div>
            <Button className={"w-full"} size={"small"} variant="contained"
                    startIcon={<MdAirplaneTicket/>}>
                View Tickets
            </Button>
        </div>
        <div className={"bg-gradient-to-br from-blue-900 to-white/10 p-4 rounded"}>
            <img src={"agoda-logo.png"}
                 className={"h-4 w-24 object-contain"}/>
            <div className={"text-sm"}>Book hotels in {props.plan.city.name} with our partner hotel provider for as low
                as HKD600
            </div>
            <div className={"h-4"}></div>
            <Button className={"w-full text-white"} size={"small"} variant="contained" color={"info"}
                    startIcon={<MdSearch/>}>
                Book Now
            </Button>
        </div>
        {
            days.map(day => {
                const dayEvents = props.plan.events
                    .filter(e => e.from.isSame(day, "day"));
                return <>
                    <div className={"flex gap-1 text-lg"}>
                        <div className={"font-bold"}>{day.format("DD MMM")}</div>
                        <div>({day.format("ddd")})</div>
                        <div className={"m-auto"}></div>
                        <Button startIcon={<MdAdd/>} size={"small"}>Add Event</Button>
                    </div>
                    {
                        dayEvents.length === 0 &&
                        <div
                            className={"border-solid border-white/5 p-4 flex place-items-center place-content-center rounded text-white/25"}>No
                            Event</div>
                    }
                    {
                        dayEvents.map((e, i) => <EventCard event={e}/>)
                    }
                </>;
            })
        }
    </div>;
}