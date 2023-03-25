import dotenv from "dotenv";
dotenv.config();
import express from "express"
import ImageGenerator from "./handlers/replicate/replicate.js";

const token = process.env.TOKEN
const modelId = process.env.MODEL_ID

const app = express();


app.get('/', (req, res) => {
    const imageCreator = new ImageGenerator({ token, modelId });
    imageCreator.runModel("a medieval castle in the middle of a forest, higly detailed, with a river flowing through it, Unreal, ArtStation")
        .then((response) => {
            console.log(response.data)
            res.send(response.data)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send(e)
        })
})

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`server on http://localhost:${port}`) })