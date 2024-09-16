const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    user_id: String,
    id: String,
    msg: String,
    timestamp: Number,
    type: String,
    seen: Boolean,
    content: String,
    title: String,
    post_id: String,
    path: String,
    to: String,
})

module.exports = mongoose.models.notification || mongoose.model("notification", notificationSchema);;