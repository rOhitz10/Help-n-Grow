 const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
    if (!process.env.MONGO_DB_URL) {
        throw new Error("MONGO_DB_URL is not configured");
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("DB successfully connected");
    } catch (err) {
        console.error("DB connection error:", err.message);
        throw err;
    }
}

module.exports = dbConnection;
