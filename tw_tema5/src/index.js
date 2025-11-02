import { pi, circleArea } from "../custom_package/math.js";

console.log(pi);
console.log(circleArea(2));

import * as fs from 'fs/promises'
import * as path from 'path'

const folderPath = path.join(process.cwd(), 'tempFolder');
const filePath = path.join(folderPath, 'tempFile.txt');

// await fs.mkdir(folderPath);
// await fs.writeFile(filePath, 'Blah blah');
// await fs.rm(filePath);
// await fs.rmdir(folderPath);

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import e from "express";

let app = express()
let router = express.Router()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use('/main', router)

const resources = [
    {id: 1, name: 'Placinta', price: 12},
    {id: 2, name: 'Fistic', price: 15},
    {id: 3, name: 'Carton oua', price: 18},
    {id: 4, name: 'Legume asiatice', price: 20},
    {id: 5, name: 'Paste', price: 8},
]

router.route('/getItem/:id').get((req, res) => {
    const { id } = req.params;
    const num = parseInt(id, 10) 
    const found = resources.find(i => i.id === num)
    if (found) {
        res.status(200).json(found);
    } else {
        res.status(404).send(`Item with ID ${id} not found.`);
    }
})

// let port = 8000
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}. Access item with: http://localhost:${port}/main/getItem/1`);
// })