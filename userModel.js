const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: 'email_subscriptions'  // Specify the collection name
});

const userModel = mongoose.model('EmailSubscription', userSchema);

module.exports = userModel;
