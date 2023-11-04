import {NextApiRequest, NextApiResponse} from 'next';
import Fuse from "fuse.js";
import Cities from "../../data/Cities";

const fuse = new Fuse(Cities, {
    keys: ["city", "country"]
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const {query: {q}, method} = req;
    const results = fuse.search(q as string);
    res.json({query: q, results: results.slice(0, 5).map(o => o.item)});
}
