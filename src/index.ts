import dotenv from "dotenv";
dotenv.config();
import express from "express"
import ImageGenerator from "./handlers/replicate/replicate.js";

import generateImage from "./routes/generateImage.js";
import getPrediction from "./routes/getPrediction.js";

const token = process.env.TOKEN
const modelId = process.env.MODEL_ID

const app = express();


app.post('/generate', generateImage)
app.get('/output', getPrediction)

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`server on http://localhost:${port}`) })