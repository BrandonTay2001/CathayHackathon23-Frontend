import moment from "moment";
import {PlanEvent} from "./PlanEvent";

export interface Plan {
    name: string,
    city: {
        name: string,
        country: string,
        loc: {
            lat: number,
            lon: number
        }
    },
    start: moment.Moment,
    end: moment.Moment,
    events: PlanEvent[]
}
