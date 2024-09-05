const mongoose = require('mongoose');
const connection = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("db connected");
        })
        .catch((error) => {
            console.log("db connection failed", error);
        })
}
module.exports = connection
