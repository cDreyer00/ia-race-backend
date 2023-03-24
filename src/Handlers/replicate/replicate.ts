import axios from 'axios'


interface IPrediction {
    id: string,
}

interface IImageGenerator {
    predictions: IPrediction[],
    token: string,
    modelId: string,
    apiUrl: string,
    check(): string,
    runModel(prompt: string): Promise<any>,
    predictionOutput(predictionId: string, secsForOutput: number): Promise<any>,
    downloadImage(predictionId: string, fileName: string): Promise<any>
}


class ImageGenerator {

    predictions = []
    _token: string;
    _modelId: string;
    _apiUrl: string;


    constructor(token: string, modelId: string) {
        this._token = token;
        this._modelId = modelId;

        this._modelId = modelId;

        this._apiUrl = 'https://api.replicate.com/v1/predictions'
    }

    checkModel() {
        // check model by making an api request
        return new Promise(async (resolve, reject) => {
            const headers = {
                'Authorization': `Token ${this._token}`,
                'Content-Type': 'application/json'
            }
            const res = await axios.get(this._apiUrl, { headers })
            if (res.status === 200) {
                resolve(true)
            } else {
                reject(false)
            }
        })

    }

    runModel(prompt: string) {
        return new Promise(async (resolve, reject) => {
            const data = {
                'version': this._modelId,
                'input': {
                    'prompt': prompt
                }

            }

            const headers = {
                'Authorization': `Token ${this._token}`,
                'Content-Type': 'application/json'
            }
            try {

                let res = await axios.post(this._apiUrl, data, { headers })
                res = res.data;
                if (res.id) {
                    this.predictions.push(res);
                }

                resolve(res);
            } catch (e) {
                reject(e);
            }
        })
    }


    async predictionOutput(predictionId, secsForOutput) {
        return new Promise(async (resolve, reject) => {
            /*
            TODO:
            - check if have a output already and await if not
            */

            const headers = {
                'Authorization': `Token ${this._token}`,
                'Content-Type': 'application/json'
            }

            try {
                let res = await axios.get(`${this._apiUrl}/${predictionId}`, { headers })
                while (!res.data.output) {
                    res = await axios.get(`${this._apiUrl}/${predictionId}`, { headers })
                }
                res = res.data.output;

                resolve(res);
            } catch (e) {
                try {
                    reject(e.response.data.detail)
                } catch {
                    reject(e.message)
                }
            }
        })
    }



    // downloadImage(predictionId, fileName) {
    //     const filePath = path.join(process.cwd(), 'assets', 'images', fileName);
    //     return new Promise(async (resolve, reject) => {

    //     });
    // }
}
module.exports = {
    ImageGenerator
}