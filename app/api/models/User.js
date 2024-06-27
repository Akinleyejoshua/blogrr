const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    pwd: String,
    username: String,
    img: String,
    following: Array,
    followers: Array,
    bio: String,
    number: String,
    whatsapp: String,
})

module.exports = mongoose.models.user || mongoose.model("user", userSchema);;