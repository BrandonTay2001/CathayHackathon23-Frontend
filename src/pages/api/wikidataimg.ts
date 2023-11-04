import {NextApiRequest, NextApiResponse} from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const {query: {wikidata}, method} = req;

    const imgReq = await fetch(`https://www.wikidata.org/w/api.php?action=query&prop=pageimages&titles=${wikidata}&format=json&piprop=original`);
    const imgJs = await imgReq.json();
    console.log(imgJs)
    const imgUrl = imgJs.query?.pages[Object.keys(imgJs.query?.pages)[0]]?.original?.source;

    res.json({wikidata, url: imgUrl || null});

}
