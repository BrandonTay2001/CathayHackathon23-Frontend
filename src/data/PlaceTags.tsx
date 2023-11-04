import React from "react";
import {
    Attractions,
    Camera,
    Forest,
    Foundation,
    Museum,
    Restaurant,
    ShoppingBag,
    TheaterComedy
} from "@mui/icons-material";

const PlaceTags: {
    tag: string,
    otmTags: string[],
    icon: React.ReactNode
    hidden?: boolean
}[] = [
    {
        tag: "Dining",
        otmTags: ["restaurants"],
        icon: <Restaurant fontSize={"small"}/>,
        hidden: true
    },
    {
        tag: "Amusements",
        otmTags: ["amusements"],
        icon: <Attractions fontSize={"small"}/>

    },
    {
        tag: "Shopping",
        otmTags: ["shops"],
        icon: <ShoppingBag fontSize={"small"}/>
    },
    {
        tag: "Photo-taking",
        otmTags: ["view_points"],
        icon: <Camera fontSize={"small"}/>
    },
    {
        tag: "Museums",
        otmTags: ["museums"],
        icon: <Museum fontSize={"small"}/>
    },
    {
        tag: "Nature",
        otmTags: ["natural"],
        icon: <Forest fontSize={"small"}/>
    },
    {
        tag: "Historic Heritage",
        otmTags: ["historic_architecture", "historic_object"],
        icon: <Foundation fontSize={"small"}/>
    },
    {
        tag: "Performances",
        otmTags: ["theatres_and_entertainments"],
        icon: <TheaterComedy fontSize={"small"}/>
    },
    {
        tag: "Architecture",
        otmTags: ["historic_architecture"],
        icon: <Foundation fontSize={"small"}/>
    },
];
export default PlaceTags;
