const express = require('express')
const bcrypt = require('bcryptjs')
const app = express()
const { userModel } = require('./models/allModels')
const connection = require("./dbConfig/dbConfig")
require('dotenv').config()


app.use(express.json())
const port = process.env.PORT;

// api end points
app.post('/registration', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log(firstName, lastName, email, password);
        if (!(firstName && lastName && email && password)) {
            return res.status(400).send("Fill all fields")
        }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send("user already exits with this email")
        }
        // Password validation function
        function isValidPassword(password) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*])[^\s]{8,}$/.test(password);
        }
        if (!(isValidPassword(password))) {
            return res.status(400).send("Invalid password format. Password must be at least 8 characters long and contain at least one capital letter, one special character, and one number.");
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({ firstName, lastName, email, password: hashPassword })
        console.log(newUser);
        res.status(200).send("User Registerd Successfully")

    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
})



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, async () => {
    console.log(`furniflex listening at http://localhost:${port}`)
    try {
        await connection();
    } catch (err) {
        console.log(err);
    }
})