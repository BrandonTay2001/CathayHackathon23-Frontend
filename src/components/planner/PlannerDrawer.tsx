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
import Button from "@mui/material/Button";
import {useSnackbar} from "notistack";
import Orb from "../effects/Orb";
import {FragDrawer} from "../generic/FragDrawer";
import {Plan} from "../../types/Plan";
import {PlanEvent} from "../../types/PlanEvent";
import ms from "../../utils/ms";
import Planner from "../../ai/Planner";
import PlaceTags from "../../data/PlaceTags";
import TextField from "@mui/material/TextField";

export default function PlannerDrawer(props: {
    open: boolean,
    setOpen: (open: boolean) => void,
    plan: Plan
    onGenerate: (events: PlanEvent[]) => void
}) {
    const {enqueueSnackbar} = useSnackbar();
    const paces: ("Slow Paced" | "Normal" | "Fast Paced")[] = ["Slow Paced", "Normal", "Fast Paced"];
    const [pace, setPace] = useState<"Slow Paced" | "Normal" | "Fast Paced">(paces[1]);
    // const [tags, setTags] = useState<string[]>([]);
    const [prompt, setPrompt] = useState<string>("A romantic trip with nature and history.");

    const [generating, setGenerating] = useState(false);
    const onGenerate = async () => {
        if (prompt === "") {
            enqueueSnackbar("Please enter a prompt.");
            return;
        }
        setGenerating(true);
        // await ms(4000);
        const events = await Planner(props.plan, prompt, pace);

        if (!events) {
            enqueueSnackbar("Unable to generate a plan. Please modify the options and try again.");
            setGenerating(false);
            return;
        }
        props.onGenerate(events);
        // await ms(1000);
        props.setOpen(false);
        // await ms(1000);
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
                <TextField label="Prompt"
                           multiline
                           rows={4}
                           value={prompt}
                           onChange={e => setPrompt(e.target.value)}
                           placeholder={"A romantic trip with nature and history."}
                />
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
