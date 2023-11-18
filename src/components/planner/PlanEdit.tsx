import {Fab, IconButton} from "@mui/material";
import {AutoFixHigh} from "@mui/icons-material";
import * as React from "react";
import {useEffect, useState} from "react";
import EditEventDrawer from "./EditEventDrawer";
import update from "immutability-helper";
import WizardDrawer from "./PlannerDrawer";
import Frag from "../generic/Frag";
import {Plan} from "../../types/Plan";
import ms from "../../utils/ms";
import {PlanEvent} from "../../types/PlanEvent";
import CardList from "./CardList";
import {MdDateRange, MdViewDay} from "react-icons/md";
import Timetable from "./Timetable";

export default function PlanEdit(props: {
    open: boolean,
    setOpen: (open: boolean) => void,
    plan: Plan,
    setPlan: (plan: Plan) => void,
}) {
    const [wizardOpen, setWizardOpen] = useState(false);

    const [editingEventId, setEditingEventId] = useState<number | null>(null);
    const [editOpen, setEditOpen] = useState(false);

    const [timetableOpened, setTimetableOpened] = useState(false);

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

    return <Frag {...props} title={props.plan.name} className={"p-0"} noPad
                 buttons={<IconButton size={"large"}
                                      onClick={() => setTimetableOpened(!timetableOpened)}>
                     {timetableOpened ? <MdViewDay/> : <MdDateRange/>}
                 </IconButton>
                 }>
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
        <Fab color="primary" variant={"circular"} className={"m-4 right-0 bottom-0 fixed"}
             onClick={() => setWizardOpen(true)}>
            <AutoFixHigh/>
        </Fab>
        <div className={"w-full flex-1 overflow-scroll relative"}>
            {
                !timetableOpened && <CardList plan={props.plan}/>
            }
            {
                timetableOpened && <Timetable plan={props.plan} onClickEvent={e => {
                }}/>
            }
        </div>
    </Frag>;
}
