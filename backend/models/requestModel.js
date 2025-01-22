// models/requestModel.js

const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }, // User A (sender)
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }, // User B (receiver)
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending', // default to 'pending' status
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const RequestModel = mongoose.model('Request', requestSchema);

module.exports = RequestModel;
