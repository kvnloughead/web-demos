var mongoose = require("mongoose"); 

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// Instead of this:
// var Post = mongoose.model("Post", postSchema);
// use this:
module.exports = mongoose.model("Post", postSchema);