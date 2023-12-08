require('dotenv').config();
const mongoose = require("mongoose");

const connectdb = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
        process.exit(1);
    }
}

module.exports = connectdb;

