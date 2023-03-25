import dotenv from "dotenv";
dotenv.config();

import { Response, Request } from "express";
import ImageGenerator from "../handlers/replicate/replicate.js";

export default function generateImage(req: Request, res: Response) {
    const token = process.env.TOKEN;
    const modelId = process.env.MODEL_ID;
    const id = req.query.id as string;

    const imageCreator = new ImageGenerator({ token, modelId });

    imageCreator.predictionOutput(id)
        .then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((e) => {
            res.status(500).send(e);
        })
}
