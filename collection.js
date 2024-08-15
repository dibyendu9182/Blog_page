const mongoose = require('mongoose');

const Loginschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensures unique usernames
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String
    },
    company: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures unique emails
    },
    phone: {
        type: String,
        required: true
    }
}, {
    collection: 'user_logins'
});

const collection = mongoose.model("UserLogin", Loginschema);

module.exports = collection;
