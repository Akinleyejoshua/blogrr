const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user_id: String,
    main_post_id: String,
    is_comment: Boolean,
    timestamp: Number,
    title: String,
    content: String,
    likes: Array,
    views: Array,
})

module.exports = mongoose.models.post || mongoose.model("post", postSchema);;