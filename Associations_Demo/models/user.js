var mongoose = require("mongoose");

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    // * pass an array of object id's belonging to Posts into the schema for the other object
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

// Instead of this:
// var User = mongoose.model("User", userSchema);
// use this:
module.exports = mongoose.model("User", userSchema);