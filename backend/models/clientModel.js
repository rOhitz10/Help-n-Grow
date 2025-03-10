// models/clientModel.js

const Address = require("ipaddr.js");
const { required } = require("joi");
const mongoose = require("mongoose");
const { level } = require("npmlog");

const clientSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    sponsorId: { type: String, required: true }, 
    epin: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    number: { type: Number, required: true },
    email: { type: String, required: true },

    address : {type:String  },
    city : {type:String ,required:false },
    country : {type:String , required:false},
    state : {type:String  , required:false},
    level: { type: Number, default: 0 },
    halt: {type:Boolean,default:false},

    createdAt: { type: Date, default: Date.now },
    newLinksReceived: { type: Number, default: 0 },  
    accountNo: { type: String, required: false },
    accountHolderName: { type: String, required: false },
    ifscCode: { type: String, required: false },
    bankName: { type: String, required: false },
    branchName: { type: String, required: false },
    googlePay: { type: String, required: false },
    phonePe: { type: String, required: false },
    activate: { type: Boolean, default: true },
    previousLevel: { type: Number, default: 0 },
    levelUpdateAt: { type: Date, default: Date.now },
    receivedRequestsAt: { type: Date, required: false },       
    role :{

        type:String,
        enum : ['client','admin'],
        default:'client'
    },
    newLinksReceived: {
        type: Number,
        default: 0, // Tracks the number of received requests
    },
    lastRequestSentAt: {
        type: Date,
        default: null, // Tracks when the user last sent a request
    },
    token : {
        type : String
    },
    tokenExpire : {
        type : Date
    }

});

const clientModel = mongoose.model("Client", clientSchema);
module.exports = clientModel;
