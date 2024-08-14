const mongoose = require('mongoose');

const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: 'user_logins'  // Specify the collection name
});

const collection = mongoose.model("UserLogin", Loginschema);

module.exports = collection;
