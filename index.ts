import express from "express"
const port = 3001;

const app = express();

app.get('/', (req, res) => {
    res.send('hello from server')
})

app.listen(port, () => { console.log(`server on http://localhost:${port}`) })