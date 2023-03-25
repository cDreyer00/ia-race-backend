import axios, { AxiosResponse } from 'axios'

interface IPrediction {
    id: string,
}

interface IImageGenerator {
    predictions: IPrediction[],
    token: string,
    modelId: string,
    apiUrl: string,
    check(): Promise<boolean>,
    runModel(prompt: string): Promise<AxiosResponse>,
    predictionOutput(predictionId: string, secsForOutput: number): Promise<IPrediction>,
}

interface IImageData {
    id: string,
    url: string,
}

export interface IModelAccess {
    token: string,
    modelId: string
}


export default class ImageGenerator implements IImageGenerator {

    predictions: IPrediction[];
    modelId: string;
    apiUrl: string;
    token: string;

    constructor({ token, modelId }: IModelAccess) {
        this.token = token;
        this.modelId = modelId;
        this.modelId = modelId;
        this.predictions = [];

        this.apiUrl = 'https://api.replicate.com/v1/predictions'
    }

    async check(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const headers = {
                'Authorization': `Token ${this.token}`,
                'Content-Type': 'application/json'
            }
            const res = await axios.get(this.apiUrl, { headers })
            if (res.status === 200) {
                resolve(true)
            } else {
                reject(false)
            }
        })
    }

    downloadImage(predictionId: string, fileName: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    checkModel() {
        // check model by making an api request

    }

    runModel(prompt: string): Promise<AxiosResponse> {
        return new Promise(async (resolve, reject) => {
            const data = {
                'version': this.modelId,
                'input': {
                    'prompt': prompt
                }
            }

            const headers = {
                'Authorization': `Token ${this.token}`,
                'Content-Type': 'application/json'
            }

            try {

                let res = await axios.post(this.apiUrl, data, { headers })
                let imageData: IImageData = res.data;
                if (imageData.id) {
                    this.predictions.push(imageData);
                }

                resolve(res);
            } catch (e) {
                reject(e);
            }
        })
    }

    async predictionOutput(predictionId: string): Promise<IPrediction> {
        return new Promise(async (resolve, reject) => {
            const headers = {
                'Authorization': `Token ${this.token}`,
                'Content-Type': 'application/json'
            }

            try {
                let res = await axios.get(`${this.apiUrl}/${predictionId}`, { headers })
                while (!res.data.output) {
                    res = await axios.get(`${this.apiUrl}/${predictionId}`, { headers })
                }
                console.log(res.data.output)
                const prediction = res.data.output as IPrediction;
                console.log("======= prediction ===========")
                console.log(prediction)
                resolve(prediction);
            } catch (e) {
                reject(e)
            }
        })
    }

    // downloadImage(predictionId, fileName) {
    //     const filePath = path.join(process.cwd(), 'assets', 'images', fileName);
    //     return new Promise(async (resolve, reject) => {

    //     });
    // }
}