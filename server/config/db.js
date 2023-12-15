require('dotenv').config();
const mongoose = require("mongoose");

const connectdb = async() => {
    try{
        await mongoose.connect('mongodb+srv://muhammad:1251998@cluster0.hc7wvnr.mongodb.net/?retryWrites=true&w=majority', {
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

