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
        icon: <Restaurant fontSize={"14px"}/>,
        hidden: true
    },
    {
        tag: "Amusements",
        otmTags: ["amusements"],
        icon: <Attractions fontSize={"14px"}/>

    },
    {
        tag: "Shopping",
        otmTags: ["shops"],
        icon: <ShoppingBag fontSize={"14px"}/>
    },
    {
        tag: "Photo-taking",
        otmTags: ["view_points"],
        icon: <Camera fontSize={"14px"}/>
    },
    {
        tag: "Museums",
        otmTags: ["museums"],
        icon: <Museum fontSize={"14px"}/>
    },
    {
        tag: "Nature",
        otmTags: ["natural"],
        icon: <Forest fontSize={"14px"}/>
    },
    {
        tag: "Historic Heritage",
        otmTags: ["historic_architecture", "historic_object"],
        icon: <Foundation fontSize={"14px"}/>
    },
    {
        tag: "Performances",
        otmTags: ["theatres_and_entertainments"],
        icon: <TheaterComedy fontSize={"14px"}/>
    },
    {
        tag: "Architecture",
        otmTags: ["historic_architecture"],
        icon: <Foundation fontSize={"14px"}/>
    },
];
export default PlaceTags;
