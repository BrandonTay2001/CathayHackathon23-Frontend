import * as React from "react";
import {useEffect, useState} from "react";
import {DateRange, LocalizationProvider, MobileDateRangePicker} from "@mui/x-date-pickers-pro";
import TextField from "@mui/material/TextField";
import moment from "moment";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {Autocomplete, Button} from "@mui/material";
import {AutoFixHigh, Create} from "@mui/icons-material";
import Cities from "../data/Cities";
import Frag from "./generic/Frag";
import {Plan} from "../types/Plan";
import {useSnackbar} from "notistack";
import useFetch from "../utils/useFetch";

export default function PlanCreate(props: {
    open: boolean,
    setOpen: (open: boolean) => void,
    onCreate: (plan: Plan) => void
}) {

    //TEMP!!!
    React.useEffect(() => {
        let curId = setInterval(() => {
            const elems = document.getElementsByClassName("MuiDateRangeCalendar-root");
            if (elems.length <= 0)
                return;
            const elem = elems[0];
            const traverse = (elem: HTMLElement) => {
                if (elem.textContent?.toLowerCase() == "MUI X Missing license key".toLowerCase()) {
                    console.log("Removed: " + elem);
                    elem.style.visibility = "hidden";
                    return;
                }
                for (let i = 0; i < elem.children.length; i++) {
                    traverse(elem.children[i] as HTMLElement);
                }
            };
            traverse(elem as HTMLElement);
        }, 500);
        return () => {
            clearInterval(curId);
        };
    }, []);

    const {enqueueSnackbar} = useSnackbar();

    React.useEffect(() => {
        const interval = setInterval(() => {
            const elm = document.evaluate("//div[text()='MUI X: Missing license key']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (elm)
                elm.parentElement!.removeChild(elm);
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const [name, setName] = useState("");

    const [cityQuery, setCityQuery] = useState("");
    useEffect(() => {
        if (cityQuery.length < 3) {
            setCities([]);
            return;
        }
        (async () => {
            setCities(null);
            const res = await fetch(`/api/cities?q=${cityQuery}`);
            const js = await res.json();
            if (js && js.query === cityQuery)
                setCities(js.results);
        })();
    }, [cityQuery]);
    const [cities, setCities] = useState<any[] | null>([]);
    const [city, setCity] = useState<{ city: string } & any | null>(null);

    const [timeRange, setTimeRange] = React.useState<DateRange<moment.Moment>>([null, null]);

    const onCreate = () => {
        if (!timeRange[0] || !timeRange[1] || !name || !city) {
            enqueueSnackbar("Please fill in all fields.");
            return;
        }

        const planStart = timeRange[0]!.clone().utc(true).startOf("day");
        const planEnd = timeRange[1]!.clone().utc(true).startOf("day");

        const plan: Plan = {
            name,
            city: {
                name: city.city,
                country: city.country,
                loc: {
                    lat: city.lat,
                    lon: city.lon
                }
            },
            start: planStart,
            end: planEnd,
            events: []
            // events: [
            //     {
            //         name: "Osaka Castle",
            //         from: start.clone().set({hour: 14}),
            //         to: start.clone().set({hour: 16}),
            //         notes: ""
            //     }
            // ]
        };
        props.onCreate(plan);
        props.setOpen(false);
    };

    return <Frag {...props} title={"Create Travel Plan"}>
        <TextField label={"Trip Name"}
                   value={name}
                   onChange={e => setName(e.target.value)}/>
        <Autocomplete
            autoHighlight
            options={cities?.map(o => ({label: `${o.city}, ${o.country}`, obj: o})) || []}
            loading={!cities}
            value={(city && `${city.city}, ${city.country}`) || ""}
            onChange={(e, v) => setCity(v?.obj)}
            inputValue={cityQuery}
            onInputChange={(e, v) => setCityQuery(v)}
            renderInput={(params) =>
                <TextField {...params}
                           label="City/Region"
                           onChange={e => setCityQuery(e.target.value)}/>
            }/>
        <LocalizationProvider dateAdapter={AdapterMoment}
                              localeText={{start: "From", end: "To"}}>
            <MobileDateRangePicker value={timeRange}
                                   onChange={(newValue) => {
                                       setTimeRange(newValue);
                                   }}
                                   // renderInput={(startProps, endProps) => (
                                   //     <div className={"flex gap-4"}>
                                   //         <TextField {...startProps} />
                                   //         <TextField {...endProps} />
                                   //     </div>
                                   // )}
            />
        </LocalizationProvider>
        <Button startIcon={<Create/>} variant="outlined" size={"large"} className={"mt-16"}
                onClick={onCreate}>
            Create Travel Plan
        </Button>
    </Frag>;
}
