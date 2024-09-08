const express = require('express')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { userModel, productModel } = require('./models/allModels')
const connection = require("./dbConfig/dbConfig")
const checkUser = require("./middlewares/checkUser")
const fs = require('fs')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
))
const port = process.env.PORT;

// api end points
app.post('/registration', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log(firstName, lastName, email, password);
        if (!(firstName && lastName && email && password)) {
            return res.status(400).json({ message: "Fill all fields" })
        }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).json({ message: "user already exits with this email" })
        }
        // Password validation function
        function isValidPassword(password) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*])[^\s]{8,}$/.test(password);
        }
        if (!(isValidPassword(password))) {
            return res.status(400).json({ message: "Invalid password format. Password must be at least 8 characters long and contain at least one capital letter, one special character, and one number." });
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({ firstName, lastName, email, password: hashPassword })
        console.log(newUser);
        res.status(200).json({ message: "User Registerd Successfully" })

    } catch (error) {
        console.log(error);
        res.json({ message: error.message })
    }
})

app.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        console.log(email);
        if (!(email && password)) {
            return res.status(400).send("Give Email and Password")
        }
        const user = await userModel.findOne({ email })
        console.log(user);
        if (!user) {
            return res.status(401).send("Register First")
        }
        else {
            const isMatch = await bcrypt.compare(password, user.password)
            console.log(isMatch);
            if (isMatch) {
                user.password = undefined
                const token = jwt.sign(
                    { user },
                    process.env.JWT_SECRET
                )
                user.token = token
                //cookie section
                const cookieOption = {
                    httpOnly: true,
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                }
                // res.cookie("token", `bearer ${token}`, cookieOption)
                res.status(200).cookie("token", `bearer ${token}`, cookieOption).send({ message: "Login Successful", user })
            }
            else {
                res.status(401).send("Invalid Password")
            }
        }
    } catch (error) {
        res.status(401).send(error.message)
    }

})
app.get('/verify-user', checkUser, (req, res) => {
    res.status(200).json({ user: req.user });
})
app.get('/logout', (req, res) => {
    console.log("api hitted");
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

app.get('/products', checkUser, async (req, res) => {
    try {
        const products = await productModel.find({})
        res.send(products)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

// app.post('/all-products', async (req, res) => {
//     try {
//         const product = fs.readFileSync('./fakeData/chairDetails.json', 'utf8')
//         const result = await productModel.create(JSON.parse(product))
//         console.log("All data inserted");
//         res.send(result)
//     } catch (error) {
//         console.log("insertion failed");
//     }
// })

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