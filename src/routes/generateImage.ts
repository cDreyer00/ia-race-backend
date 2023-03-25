import dotenv from "dotenv";
dotenv.config();

import { Response, Request } from "express";
import ImageGenerator from "../handlers/replicate/replicate.js";

const generateImage = (req: Request, res: Response) => {
    const token = process.env.TOKEN as string;
    const modelId = process.env.MODEL_ID as string;

    const imageGenerator = new ImageGenerator({ token, modelId });
}
