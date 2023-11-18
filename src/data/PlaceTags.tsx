import React from "react";
import {
    MdAttractions,
    MdCamera,
    MdForest,
    MdFoundation,
    MdMuseum,
    MdRestaurant,
    MdShoppingBag,
    MdTheaterComedy
} from "react-icons/md";

const PlaceTags: {
    tag: string,
    otmTags: string[],
    icon: React.ReactNode
    hidden?: boolean
}[] = [
    {
        tag: "Dining",
        otmTags: ["restaurants"],
        icon: <MdRestaurant className={"text-sm"}/>,
        hidden: true
    },
    {
        tag: "Amusements",
        otmTags: ["amusements"],
        icon: <MdAttractions fontSize={"small"}/>

    },
    {
        tag: "Shopping",
        otmTags: ["shops"],
        icon: <MdShoppingBag fontSize={"small"}/>
    },
    {
        tag: "Photo-taking",
        otmTags: ["view_points"],
        icon: <MdCamera fontSize={"small"}/>
    },
    {
        tag: "Museums",
        otmTags: ["museums"],
        icon: <MdMuseum fontSize={"small"}/>
    },
    {
        tag: "Nature",
        otmTags: ["natural"],
        icon: <MdForest fontSize={"small"}/>
    },
    {
        tag: "Historic Heritage",
        otmTags: ["historic_architecture", "historic_object"],
        icon: <MdFoundation fontSize={"small"}/>
    },
    {
        tag: "Performances",
        otmTags: ["theatres_and_entertainments"],
        icon: <MdTheaterComedy fontSize={"small"}/>
    },
    {
        tag: "Architecture",
        otmTags: ["historic_architecture"],
        icon: <MdFoundation fontSize={"small"}/>
    },
];
export default PlaceTags;
