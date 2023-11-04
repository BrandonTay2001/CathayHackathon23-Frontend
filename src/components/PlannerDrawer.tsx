import * as React from "react";
import {useState} from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import {AutoFixHigh} from "@mui/icons-material";
import {Plan} from "../types/Plan";
import {PlanEvent} from "../types/PlanEvent";
import {FragDrawer} from "./generic/FragDrawer";
import Button from "@mui/material/Button";
import ms from "../utils/ms";
import Orb from "./effects/Orb";
import Planner from "../ai/Planner";
import {useSnackbar} from "notistack";
import PlaceTags from "../data/PlaceTags";

export default function PlannerDrawer(props: {
    open: boolean,
    setOpen: (open: boolean) => void,
    plan: Plan
    onGenerate: (events: PlanEvent[]) => void
}) {
    const {enqueueSnackbar} = useSnackbar();
    const paces: ("Slow Paced" | "Normal" | "Fast Paced")[] = ["Slow Paced", "Normal", "Fast Paced"];
    const [pace, setPace] = useState<"Slow Paced" | "Normal" | "Fast Paced">(paces[1]);
    const [tags, setTags] = useState<string[]>([]);

    const [generating, setGenerating] = useState(false);
    const onGenerate = async () => {
        if (tags.length === 0) {
            enqueueSnackbar("Please select at least one preference.");
            return;
        }
        setGenerating(true);
        await ms(4000);
        const events = await Planner(props.plan, tags, pace);

        if (!events) {
            enqueueSnackbar("Unable to generate a plan. Please modify the options and try again.");
            setGenerating(false);
            return;
        }
        props.onGenerate(events);
        await ms(1000);
        props.setOpen(false);
        await ms(1000);
        setGenerating(false);
    };

    return <FragDrawer {...props}>
        {
            !generating && <>
                <div className={"flex flex-col place-items-center text-center mb-4"}>
                    <div className={"text-xl font-bold"}>Trip Planner</div>
                    <div>Give us your preferences and our AI planning engine will generate you a customized travel plan.
                    </div>
                </div>
                <ToggleButtonGroup exclusive
                                   color="primary"
                                   size={"small"}
                                   value={pace}
                                   onChange={(e, v) => {
                                       if (v)
                                           setPace(v);
                                   }}>
                    {paces.map((o, i) => <ToggleButton key={i} value={o} className={"flex-1"}>{o}</ToggleButton>)}
                </ToggleButtonGroup>
                <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend">Types of Places/Activities</FormLabel>
                    <FormGroup className={"grid grid-cols-2"}>
                        {
                            PlaceTags.filter(o => !o.hidden).map((o, i) =>
                                <FormControlLabel key={i}
                                                  control={
                                                      <Checkbox checked={tags.includes(o.tag)}
                                                                onClick={e => {
                                                                    if (!tags.includes(o.tag)) {
                                                                        setTags([...tags, o.tag]);
                                                                    } else {
                                                                        let t = [...tags];
                                                                        t.splice(t.indexOf(o.tag), 1);
                                                                        setTags(t);
                                                                    }
                                                                }}
                                                                name={o.tag}
                                                      />
                                                  }
                                                  label={o.tag}
                                />
                            )
                        }
                    </FormGroup>
                </FormControl>
            </>
        }
        {
            generating && <div className={"flex flex-col place-items-center text-center"}>
                <div className={"text-xl font-bold"}>Generating...</div>
                <div>Our AI planning engine is forging your customized travel plan...</div>
                <div className={"w-full aspect-square p-4 flex place-items-center place-content-center"}>
                    <Orb/>
                </div>
            </div>
        }
        <Button variant={"outlined"}
                size={"large"}
                startIcon={<AutoFixHigh/>}
                onClick={onGenerate}
                disabled={generating}>
            Generate Travel Plan
        </Button>
    </FragDrawer>;
}
