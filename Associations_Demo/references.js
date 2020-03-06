// * Demo of referencing objects within other objects in Mongoose
// * Uses an id as a pointer instead of embedding the entire object

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/db_demo_2", {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
});

var Post = require("./models/post"),
    User = require("./models/user");
    

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Smith"
// });

Post.create({
    title: "Hi I'm Bob part 4",
    content: "Therefore, blah blah blah"
}, function(err, post){
    if(err){
        console.log(err)
    } else {
        User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
            if(err){
                console.log(err)
            } else {
                foundUser.posts.push(post);
                foundUser.save(function(err, data){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                })
            }
        });
    }
});

User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
    // this gives us the actual posts, not just the id's
    if(err){
        console.log(err);
    } else {
        console.log(user)
    }
});