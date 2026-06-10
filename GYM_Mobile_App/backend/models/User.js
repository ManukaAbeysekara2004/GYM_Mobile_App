const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        unique: true,
    },
    UserAge: {
        type: Number,
        required: true,
    },
    UserNIC: {
        type: String,
        required: true,
        unique: true,
    },
    UserContactNumber: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    UserDP: {
        type: String,
        default: null,
        required: false,
    },
    Role: {
        type: String,
        required: true,
    },
    Approve: {
        type: Boolean,
        default: true,
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);