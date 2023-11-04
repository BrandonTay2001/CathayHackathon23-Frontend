import moment from "moment";

export interface PlanEvent {
    name: string,
    tags: string[],
    loc: {
        lat: number,
        lon: number
    },
    xid: string,
    wikidata: string,
    from: moment.Moment,
    to: moment.Moment,
    notes: string
}
