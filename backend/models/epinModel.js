// models/epinModel.js
const mongoose = require("mongoose");

    const epinSchema = new mongoose.Schema({
        epins: { type: String, required: true, unique: true }, // EPIN with prefix
        createdAt: { type: Date, default: Date.now }, // Track creation date
        isUsed: { type: Boolean, default: false } // Track whether the EPIN is used
    });
    
    const epinModel = mongoose.model("Epin", epinSchema);
    module.exports = epinModel;