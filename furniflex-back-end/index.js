const express = require('express')
const app = express()
const connection = require("./dbConfig/dbConfig")
require('dotenv').config()


app.use(express.json())
connection();

const port = process.env.PORT;
// api end points
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`furniflex listening at http://localhost:${port}`)
})