
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    accountNo: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    ifscCode: { type: String, required: true },
    bankName: { type: String, required: true },
    branchName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, default: "admin" },
});

const AdminModel = mongoose.model("Admin", adminSchema);
module.exports = AdminModel;
