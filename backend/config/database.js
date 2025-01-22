 const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = () => {
    mongoose.connect(
        process.env.Mongo_Db_URL,
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => console.log("DB successfully connected"))
     .catch((err) => {
         console.error("DB connection error:", err);
         process.exit(1);
     });
}

module.exports = dbConnection;
