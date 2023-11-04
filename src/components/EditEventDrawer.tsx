import * as React from "react";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Delete, ExpandMore} from "@mui/icons-material";
import {DateTimePicker} from "@mui/x-date-pickers";
import moment from "moment";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {LocalizationProvider} from "@mui/x-date-pickers-pro";
import {PlanEvent} from "../types/PlanEvent";
import {useSnackbar} from "notistack";
import {Plan} from "../types/Plan";
import {Accordion, AccordionDetails, AccordionSummary, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FragDrawer} from "./generic/FragDrawer";

export default function EditEventDrawer(props: {
    open: boolean,
    setOpen: (open: boolean) => void,
    plan: Plan,
    event: PlanEvent,
    setEvent: (event: PlanEvent | null) => void
}) {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const [img, setImg] = useState(null);
    const [desc, setDesc] = useState<string | null>(null);
    const [nativeTitle, setNativeTitle] = useState(null);

    const [loaded, setLoaded] = useState(false);
    const fetchImg = async () => {
        const req = await fetch(`https://api.opentripmap.com/0.1/en/places/xid/${props.event.xid}?` +
            new URLSearchParams({
                apikey: "5ae2e3f221c38a28845f05b6a9c9af2df9f7af7722b39da133b9073f"
            }));
        const js = await req.json();
        setImg(js["preview"]["source"]);
        if (js["wikipedia_extracts"]["title"].startsWith("ja:")) {
            setNativeTitle(js["wikipedia_extracts"]["title"].slice(3));
        } else {
            setDesc(js["wikipedia_extracts"]["text"]);
        }
    };
    useEffect(() => {
        setImg(null);
        setDesc(null);
        setNativeTitle(null);

        setLoaded(false);
        if (props.event)
            fetchImg();
    }, [props.event]);

    return <FragDrawer {...props} full>
        {
            props.event && <>
                <div className={"flex flex-col place-items-center text-center"}>
                    <div className={"text-xl font-bold"}>{props.event.name}</div>
                    {nativeTitle}
                </div>
                <div
                    className={"w-full aspect-video relative overflow-hidden flex place-items-center place-content-center border-solid border rounded border-white/50"}>
                    {
                        !loaded && <Skeleton className={"absolute w-full h-full z-[30000]"} variant={"rectangular"}/>
                    }
                    {
                        img && <img src={img!} onLoad={() => setLoaded(true)} className={"w-full h-full object-cover"}/>
                    }
                </div>
                {
                    desc && <Accordion variant={"outlined"} className={"bg-transparent"}>
                        <AccordionSummary expandIcon={<ExpandMore/>}>
                            <Typography>{desc && <>{desc!.split(" ").slice(0, 20).join(" ")}...</>}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {desc}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                }
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <div className={"w-full flex gap-4"}>
                        <DateTimePicker
                            label="From"
                            value={props.event.from}
                            onChange={(newFrom: moment.Moment | null) => {
                                if (!newFrom) return;
                                if (newFrom.isBefore(props.plan.start) || !newFrom.isBefore(props.event.to)) {
                                    enqueueSnackbar("Invalid Time Range!");
                                    return;
                                }
                                props.setEvent({...props.event, from: newFrom});
                            }}
                            // renderInput={(params: any) => <TextField {...params} /> as any}
                        />
                        <DateTimePicker
                            label="To"
                            value={props.event.to}
                            onChange={(newTo: moment.Moment | null) => {
                                if (!newTo) return;
                                if (newTo.isAfter(props.plan.end) || !props.event.from.isBefore(newTo)) {
                                    enqueueSnackbar("Invalid Time Range!");
                                    return;
                                }
                                props.setEvent({...props.event, to: newTo});
                            }}
                            // renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                </LocalizationProvider>
                <TextField
                    label="Notes"
                    multiline
                    rows={4}
                    value={props.event.notes}
                    className={"w-full"}
                    onChange={e => {
                        props.setEvent({...props.event, notes: e.target.value});
                    }}
                />
                <Button startIcon={<Delete/>}
                        variant="outlined"
                        color={"error"}
                        size={"large"}
                        className={"w-full"}
                        onClick={() => props.setEvent(null)}>
                    Delete Event
                </Button>
            </>
        }
    </FragDrawer>;
}
