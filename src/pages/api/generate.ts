import {NextApiRequest, NextApiResponse} from "next";
import OpenAI from "openai";

const apiKey = "f9d497ddba0e4f698c4064664785cd54";
const model = 'generate-timetable';
const openai = new OpenAI({
    apiKey,
    defaultHeaders: {"api-key": apiKey},
    defaultQuery: {"api-version": "2023-09-15-preview"},
    baseURL: `https://team-21.openai.azure.com/${model}`,
});
export default async function (req: NextApiRequest, res: NextApiResponse) {
    // const {query: {q}, method} = req;
    // const results = fuse.search(q as string);
    // res.json({query: q, results: results.slice(0, 5).map(o => o.item)});


    // openai.Completion.create
    const resjson = await openai.completions.create({
        model: "generate-timetable",
        prompt: "hi",
        temperature: 0.9,
        max_tokens: 4000,
        top_p: 0,
        frequency_penalty: 0,
        presence_penalty: 0,
        best_of: 1,
        stop: null
    });

    res.json(resjson);
}
