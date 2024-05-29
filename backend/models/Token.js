const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    AdminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Admin"
    },
    lToken: {
        type: String,
        default: ""
    },
    vToken: {
        type: String,
        default: ""
    },
    rToken: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
}) 

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;