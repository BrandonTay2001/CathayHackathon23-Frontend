const Places: {
    name: string,
    desc: string,
    img: string,
    city: string,
    tag: "Shopping" |
        "Amusement" |
        "Romantic" |
        "Museums" |
        "Outdoor & Nature" |
        "Heritage & Culture",
}[] = [
    {
        name: "Universal Studio Japan",
        desc: "Families flock to Universal Studios Japan for the shows, rides, and attractions that fill the park, an installment of the international Universal Studios brand. The park includes a number of the classic rides and sections, such as Marvel comic book roller coasters, a Jurassic Park ride, and a Wizarding World of Harry Potter featuring restaurants, shops, and rides. Research tickets and opening times in advance, as lines can get very long. Note that most of the signs and performances are only in Japanese.",
        img: "/places/usj.jpeg",
        city: "Osaka",
        tag: "Amusement"
    }
];

export default Places;
