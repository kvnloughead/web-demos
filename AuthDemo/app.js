const express               = require("express"),                   
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      User                  = require("./models/user");
      
mongoose.connect("mongodb://localhost:27017/auth_demo", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// ==========================
// * passport setup boilerplate
// ==========================

app.use(require("express-session")({
    secret: "This is the secret string for decoding the data",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ========
// * ROUTES
// ========
app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// * Auth Routes
// show sign up form
app.get("/register", function(req, res){
    res.render("register");
});

// handles user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}),  // User to create, sans password
                           req.body.password,              // password as second parameter 
                           function(err, user){            // welcome to callback hell
                              if(err){
                                  console.log("Error registering user");
                                  console.log(err);
                                  return res.render("register");
                              }
                              // local refers to the authentication strategy
                              passport.authenticate("local")(req, res, function(){
                                res.redirect("/secret");
                              })
    })
})

// * Login Routes
// render login form
app.get("/login", function(req, res){
    res.render("login");
});

// handles login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});

// * Logout Route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// middleware to authenticate secret route
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen("3000", function(){
    console.log("Serving AuthDemo on port 3000...");
});