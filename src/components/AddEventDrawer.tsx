// import * as React from 'react';
// import {useEffect, useState} from 'react';
// import Typography from '@mui/material/Typography';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import TextField from "@mui/material/TextField";
// import {CardActionArea, InputAdornment} from "@mui/material";
// import {Search} from "@mui/icons-material";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import {Plan} from "../types/Plan";
//
// export default function AddEventDrawer(props: {
//     open: boolean,
//     setOpen: (open: boolean) => void,
//     city: string,
//     plan: Plan
//     onAdd: (name: string) => void
// }) {
//     const [results, setResults] = useState([]);
//     const refresh = async () => {
//         const req = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?` + new URLSearchParams({
//             radius: "50000",
//             lon: "135.5023",
//             lat: "34.6937",
//             rate: "3",
//             format: "json",
//             "apikey": "5ae2e3f221c38a28845f05b6a9c9af2df9f7af7722b39da133b9073f"
//         }));
//         const js = await req.json();
//         setResults(js)
//     };
//     useEffect(() => {
//         refresh().then();
//     }, []);
//
//     return <SwipeableDrawer
//         anchor="bottom"
//         open={props.open}
//         onOpen={() => props.setOpen(true)}
//         onClose={() => props.setOpen(false)}
//         disableSwipeToOpen={true}
//         style={{zIndex: 1200}}>
//         <div
//             className={"w-full h-[calc(100vh-54px)] rounded-t bg-neutral-700 overflow-hidden p-4 flex flex-col gap-4 place-items-center"}>
//             <div className={"h-1.5 w-8 rounded-full bg-white"}/>
//             <div className={"text-xl font-bold"}>Add Place & Activity</div>
//             <TextField label="Search Place & Activity..."
//                        variant="outlined"
//                        className={"w-full"}
//                        InputProps={{
//                            endAdornment: <InputAdornment position={"end"}>
//                                <Search/>
//                            </InputAdornment>
//                        }}/>
//             <div className={"flex-1 overflow-scroll rounded-t"}>
//                 <div className={"flex flex-col gap-4"}>
//                     {
//                         results.map((o, i) =>
//                                 <Card className={"w-full"} key={i}>
//                                     <CardActionArea onClick={() => props.onAdd(o.name)}>
//                                         <CardMedia
//                                             component="img"
//                                             image={o.img}
//                                             className={"aspect-video"}
//                                         />
//                                         <CardContent>
//                                             <Typography gutterBottom variant="h5" component="div">
//                                                 {o.name}
//                                             </Typography>
//                                             <Typography variant="body2" color="text.secondary">
//                                                 {o.desc.split(" ").slice(0, 20).join(" ") + "..."}
//                                             </Typography>
//                                         </CardContent>
//                                     </CardActionArea>
//                                 </Card>
//                             )
//                     }
//                 </div>
//             </div>
//         </div>
//     </SwipeableDrawer>;
// }
export default function AppEventDrawer() {
    return <></>;
}
