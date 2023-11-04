import moment from "moment";

export interface Reel {
    author: string,
    pfp: string,
    title: string,
    content: string,
    video: string,
    date: moment.Moment
}
