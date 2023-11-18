import {Plan} from "../types/Plan";
import shuffleArray from "../utils/shuffleArray";
import {PlanEvent} from "../types/PlanEvent";
import pickOne from "../utils/pickOne";
import PlaceTags from "../data/PlaceTags";
import moment from "moment";

interface Location {
    name: string,
    kinds: string
    rate: number,
    dist: number,
    wikidata: string,
    xid: string
    point: {
        lon: number,
        lat: number,
    },
}

// export default async function Planner(
//     plan: Plan,
//     prompt: string,
//     pace: "Slow Paced" | "Normal" | "Fast Paced"
// ): Promise<PlanEvent[] | null> {
//     const req = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?` + new URLSearchParams({
//         radius: "50000",
//         lon: plan.city.loc.lon.toString(),
//         lat: plan.city.loc.lat.toString(),
//         kinds: otmTags.join(","),
//         rate: "3",
//         format: "json",
//         apikey: "5ae2e3f221c38a28845f05b6a9c9af2df9f7af7722b39da133b9073f"
//     }));
//     const places: Location[] = await req.json();
//
//     shuffleArray(places);
//     const scoredPlaces = places.map(o => {
//         const tags = o.kinds.split(",");
//         let score = 0;
//         if (tags.includes("tourist_facilities"))
//             score += 1;
//         if (tags.includes("interesting_places"))
//             score += 1;
//         if (o.rate === 7)
//             score += 2;
//         return {
//             obj: o,
//             score: score
//         };
//     }).sort((a, b) => b.score - a.score)
//         .map(o => o.obj);
//     let spots = scoredPlaces.filter(o => !o.kinds.split(",").includes("restaurants"));
//     let restaurants = scoredPlaces.filter(o => o.kinds.split(",").includes("restaurants"));
//
//     const curTime = plan.start.clone().set({hour: 10});
//     const planEvents: PlanEvent[] = [];
//     for (
//         ;
//         curTime.isBefore(plan.end.clone().add(1, "day"));
//         curTime.add(1, "day").set({hour: 10, minute: 0})
//     ) {
//         let lunch = false;
//         let dinner = false;
//         for (
//             ;
//             curTime.hour() < 22;
//             curTime.add(30, "minute")
//         ) {
//             const fromTime = curTime.clone();
//
//             let nextLoc: Location | null = null;
//             let duration: number | null = null;
//             if (curTime.hour() >= 12 && !lunch) {
//                 if (restaurants.length <= 0)
//                     return null;
//                 nextLoc = restaurants.splice(0, 1)[0]!;
//                 duration = 45;
//                 lunch = true;
//             } else if (curTime.hour() >= 19 && !dinner) {
//                 if (restaurants.length <= 0)
//                     return null;
//                 nextLoc = restaurants.splice(0, 1)[0]!;
//                 duration = 45;
//                 dinner = true;
//             } else {
//                 if (spots.length <= 0)
//                     return null;
//                 nextLoc = spots.splice(0, 1)[0]!;
//                 duration = Math.min(
//                     pickOne(
//                         [pace === "Fast Paced" && 30, 60, 90, 120, pace === "Slow Paced" && 180]
//                             .filter(o => o) as number[]
//                     ),
//                     (22 - fromTime.hour()) * 60
//                 );
//                 if (duration <= 30)
//                     break;
//             }
//
//             curTime.add(duration, "minute");
//             const toTime = curTime.clone();
//
//             planEvents.push({
//                 name: nextLoc.name,
//                 tags: nextLoc.kinds.split(","),
//                 loc: nextLoc.point,
//                 xid: nextLoc.xid,
//                 wikidata: nextLoc.wikidata,
//                 from: fromTime,
//                 to: toTime,
//                 notes: ""
//             });
//         }
//     }
//
//     return planEvents;
// }

export default async function Planner(
    plan: Plan,
    prompt: string,
    pace: "Slow Paced" | "Normal" | "Fast Paced"
): Promise<PlanEvent[] | null> {
    //send JSON post request
    const res = await fetch("/api/generate_plan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "city": plan.city,
            prompt,
            pace,
            "startDate": plan.start.format("YYYY-MM-DD"),
            "endDate": plan.end.format("YYYY-MM-DD"),
        })
    });
    const resJson = await res.json();
    const planEvents: PlanEvent[] = [];
    for (const place of resJson) {
        planEvents.push({
            name: place.name,
            tags: ["amusements"],
            loc: {
                lat: 0,
                lon: 0
            },
            xid: "",
            wikidata: "",
            from: moment(place.startTime),
            to: moment(place.endTime),
            notes: place.reason,
        });
    }
    return planEvents;
}