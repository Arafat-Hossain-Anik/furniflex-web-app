const jwt = require("jsonwebtoken");

const checkUser = (req, res, next) => {
    try {
        const cookies = req.cookies;
        const token = cookies?.token.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        const { email } = decoded
        req.email = email
        next()
    } catch (error) {
        res.status(401).send("You are Unathorized")
        next(error)
    }
}
module.exports = checkUser