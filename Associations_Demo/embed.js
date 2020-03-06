// * Demo of embedding entire objects inside one another

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/db_demo", {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
});

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    // * pass the schema of one object in an array within the schema of another other, like this
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

var newUser = new User({
    email: "hermione@hogwarts.edu",
    name: "Hermione"
});

// * Then you can push Post objects into the User.post array
newUser.posts.push({
    title: "Title of my post",
    content: "Content..."
})

newUser.save(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user)
    }
})

// var newPost = new Post({
//     title: "Good grief...",
//     content: "She always pulls the ball away from me!"
// })
// newPost.save(function(err, post){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(post)
//     }
// })