import {Fab} from "@mui/material";
import {AutoFixHigh} from "@mui/icons-material";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import moment from "moment/moment";
import EditEventDrawer from "./EditEventDrawer";
import {Plan} from "../types/Plan";
import Frag from "./generic/Frag";
import {PlanEvent} from "../types/PlanEvent";
import update from "immutability-helper";
import WizardDrawer from "./PlannerDrawer";
import ms from "../utils/ms";
import PlaceTags from "../data/PlaceTags";
import MaterialColours from "../utils/MaterialColours";
import Button from "@mui/material/Button";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

export default function PlanEdit(props: {
    open: boolean,
    setOpen: (open: boolean) => void,
    plan: Plan,
    setPlan: (plan: Plan) => void,
}) {
    const [wizardOpen, setWizardOpen] = useState(false);

    const [editingEventId, setEditingEventId] = useState<number | null>(null);
    const [editOpen, setEditOpen] = useState(false);

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

    const scopeFromHour = 8;
    const scopeToHour = 24;
    const scopeTotalHour = scopeToHour - scopeFromHour;

    useEffect(() => {
        if (props.open && props.plan.events.length === 0) {
            (async () => {
                await ms(500);
                setWizardOpen(true);
            })();
        }
    }, [props.open, props.plan]);

    if (!props.plan)
        return <></>;

    return <Frag {...props} title={props.plan.name} className={"p-0"} noPad>
        {/*<AddEventDrawer open={wizardOpen}*/}
        {/*                setOpen={setAddOpen}*/}
        {/*                city={props.plan.city}*/}
        {/*                props.plan={props.plan}*/}
        {/*                onAdd={(n: string) => {*/}
        {/*                    const event: props.planEvent = {*/}
        {/*                        name: n,*/}
        {/*                        from: props.plan.start.clone().set({hour: 10}),*/}
        {/*                        to: props.plan.start.clone().set({hour: 12}),*/}
        {/*                        notes: ""*/}
        {/*                    };*/}
        {/*                    const p = update(props.plan, {events: {$push: [event]}});*/}
        {/*                    props.setprops.plan(p);*/}
        {/*                    setAddOpen(false);*/}
        {/*                    setEditingEventId(p.events.length - 1);*/}
        {/*                    setEditOpen(true);*/}
        {/*                }}/>*/}

        <WizardDrawer open={wizardOpen}
                      setOpen={setWizardOpen}
                      plan={props.plan}
                      onGenerate={(events) => {
                          props.setPlan(update(props.plan, {events: {$set: events}}));
                      }}/>
        <EditEventDrawer open={editOpen}
                         setOpen={setEditOpen}
                         plan={props.plan}
                         event={props.plan.events[editingEventId!]}
                         setEvent={(event: PlanEvent | null) => {
                             if (event)
                                 props.setPlan(update(props.plan, {events: {[editingEventId!]: {$set: event}}}));
                             else {
                                 props.setPlan(update(props.plan, {events: {$splice: [[editingEventId!, 1]]}}));
                                 setEditOpen(false);
                             }
                         }}/>
        <div className={"w-full flex-1 overflow-scroll relative"}>
            {/*<div className={"bg-[#006b6e] p-2 bg-[url('/cx-cover.jpg')]"}>*/}
            <div className={"bg-gradient-to-br from-[#006b6e] to-white/10 p-4"}>
                <img className={"w-32"} src={"cx-logo-white.png"}/>
                <div className={"text-sm"}>Get tickets to {props.plan.city.name} for as low as HKD1,600</div>
                <div className={"h-4"}></div>
                <Button className={"w-full"} size={"small"} variant="contained" startIcon={<AirplaneTicketIcon/>}>
                    View Tickets
                </Button>
            </div>
            <div className={"flex-1 overflow-scroll relative"}>
                <Fab color="primary" variant={"circular"} className={"m-4 right-0 bottom-0 fixed"}
                     onClick={() => setWizardOpen(true)}>
                    <AutoFixHigh/>
                </Fab>
                <div className={"grow h-full flex flex-col relative mr-4 mb-4"}
                     style={{width: `${200 * days.length}px`, height: `1000px`}}>
                    <div className={"absolute inset-0"}>
                        <div className={"w-[70px] h-[60px] bg-neutral-900 sticky left-0 top-0 z-50"}></div>
                    </div>
                    <div className={"pl-[70px] flex sticky top-0 bg-neutral-900 z-10"}>
                        {
                            days.map((o, i) =>
                                <div key={i}
                                     className={"h-[60px] flex flex-col place-items-center place-content-center text-neutral-400"}
                                     style={{width: `calc(100%/${days.length})`}}>
                                    <div className={"font-bold"}>{o.format("DD/MM (ddd)")}</div>
                                    <div className={"text-xs"}>Day {o.diff(props.plan.start, "days") + 1}</div>
                                </div>
                            )
                        }
                    </div>
                    <div className={"flex grow"}>
                        <div className={"w-[70px] relative sticky left-0 bg-neutral-900 z-20"}>
                            {
                                [...Array(scopeToHour - scopeFromHour)].map((_, i) => {
                                    const hour = scopeFromHour + i;
                                    return <div key={i}
                                                className={"w-full pr-[14px] absolute text-[12px] flex align-middle justify-end text-neutral-400"}
                                                style={{top: `calc(${100 * (hour - scopeFromHour) / scopeTotalHour}% - 10px)`}}>
                                        {hour === 12 ? "noon" : hour <= 12 ? `${hour} am` : `${hour - 12} pm`}
                                    </div>;
                                })
                            }
                        </div>
                        <div className={"grow relative"}>
                            {
                                [...Array(scopeToHour - scopeFromHour)].map((_, i) => {
                                    const hour = scopeFromHour + i;
                                    return [
                                        <div key={-i * 3}
                                             className={"absolute left-[-8px] w-[calc(100%+8px)] h-[1px] bg-gray-500"}
                                             style={{
                                                 top: `${100 * (hour - scopeFromHour) / scopeTotalHour}%`
                                             }}/>,
                                        <div
                                            className={"absolute left-[-8px] w-[calc(100%+8px)] h-[1px] bg-gray-500 opacity-30"}
                                            key={-i * 3 - 1}
                                            style={{
                                                top: `${100 * (hour - scopeFromHour + .5) / scopeTotalHour}%`
                                            }}/>
                                    ];
                                })
                            }
                            {
                                [...Array(days.length)].map((_, i) =>
                                    <div key={-i * 3 - 2}
                                         className={"absolute top-[-16px] w-[1px] h-[calc(100%+16px)] bg-gray-500"}
                                         style={{
                                             left: `${100 * (i + 1) / days.length}%`
                                         }}/>)
                            }
                            {
                                props.plan.events.map((e, i) => {
                                    const eventFrom = (e.from.hour() * 60 * 60 + e.from.minute() * 60);
                                    const eventTo = (e.to.hour() * 60 * 60 + e.to.minute() * 60);
                                    const scaledFrom = (eventFrom - (scopeFromHour * 60 * 60)) / (scopeTotalHour * 60 * 60);
                                    const scaledTo = (eventTo - (scopeFromHour * 60 * 60)) / (scopeTotalHour * 60 * 60);

                                    const dayIdx = e.from.diff(days[0], "days");
                                    const tag = PlaceTags.find(o => o.otmTags.find(t => e.tags.includes(t)))!;
                                    const colour = MaterialColours[Object.keys(MaterialColours)[PlaceTags.indexOf(tag)]]["300"];

                                    return <div key={i}
                                                className={"absolute border-0 border-solid border-l-4 p-1 pl-2 overflow-hidden"}
                                                style={{
                                                    top: `${scaledFrom * 100}%`,
                                                    left: `${(dayIdx / days.length) * 100}%`,
                                                    width: `${100 / days.length}%`,
                                                    height: `${(scaledTo - scaledFrom) * 100}%`,
                                                    background: colour + "55",
                                                    borderColor: colour
                                                }}
                                                onClick={() => {
                                                    setEditingEventId(i);
                                                    setEditOpen(true);
                                                }}>
                                        <div className={"text-xs font-bold"}>{e.name}</div>
                                        <div className={"flex place-items-center text-xs gap-0.5 opacity-75"}>
                                            {tag.icon}
                                            {tag.tag}
                                        </div>
                                    </div>;
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Frag>;
}
