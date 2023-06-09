import dotenv from "dotenv";
dotenv.config();

import { Response, Request } from "express";
import ImageGenerator from "../handlers/replicate/replicate.js";

export default function generateImage(req: Request, res: Response) {
    const token = process.env.TOKEN;
    const modelId = process.env.MODEL_ID;
    const prompt = req.body.prompt;

    const imageCreator = new ImageGenerator({ token, modelId });
    imageCreator.runModel("a medieval castle in the middle of a forest, higly detailed, with a river flowing through it, Unreal, ArtStation")
        .then((response) => {
            console.log(response.data);
            res.send(response.data);
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send(e);
        });
}
