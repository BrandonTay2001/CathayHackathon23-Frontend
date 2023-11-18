import PlaceTags from "../../data/PlaceTags";
import MaterialColours from "../../utils/MaterialColours";
import * as React from "react";
import {Plan} from "../../types/Plan";
import {useMemo} from "react";
import moment from "moment";
import {PlanEvent} from "../../types/PlanEvent";

export default function Timetable(props: {
    plan: Plan,
    onClickEvent: (event: PlanEvent) => void,
}) {

    const scopeFromHour = 8;
    const scopeToHour = 24;
    const scopeTotalHour = scopeToHour - scopeFromHour;

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

    return <div className={"grow h-full flex flex-col relative mr-4 mb-4"}
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
                                        props.onClickEvent(null)
                                        //TODO
                                        // setEditingEventId(i);
                                        // setEditOpen(true);
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
    </div>;
}