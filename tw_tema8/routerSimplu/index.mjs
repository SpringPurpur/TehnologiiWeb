import express from 'express'
import router from './routes/status.mjs'

const PORT = 3000;

const app = express();
app.use(router)

app.listen(PORT, () => {
    console.log("Running on port 3000");
})