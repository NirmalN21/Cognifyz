//jshint esversion:6
require('dotenv').config();
const { log } = require("console");
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'SECRET=ijustcantdescribehowmuchiloveher',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/GoogleAuth');              //IP of localhost == 127.0.0.1

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    googleId: String,
    secret: String,
    image: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            username: user.username,
            name: user.name,
            image: user.image
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            username: user.username,
            name: user.name,
            image: user.image
        });
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    async function (accessToken, refreshToken, profile, cb) {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const image = profile.photos[0].value;

        try {
            // Check if the email already exists in the database
            let existingUser = await User.findOne({ email: email });

            // If the user already exists, return the user
            if (existingUser) {
                return cb(null, existingUser);
            }

            // If the user does not exist, create a new user
            let newUser = await User.create({ googleId, email, name, image });
            return cb(null, newUser);
        } catch (err) {
            return cb(err, null);
        }
    }
));



app.get("/", function (req, res) {
    res.render("home");
});

app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/secrets",
    passport.authenticate('google', { failureRedirect: "/login" }),
    function (req, res) {
        // Successful authentication, redirect secrets page.
        res.redirect("/secrets");
    });

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.get("/secrets", function (req, res) {
    if (req.isAuthenticated()) {
        const user = req.user;
        console.log(user,"user");
        User.find({ "secret": { $ne: null } }).then(function (foundUsers) {
            res.render("secrets", { usersWithSecrets: foundUsers, user: user });
        }).catch(function (err) {
            console.log(err);
            res.redirect("/login"); 
        });
    } else {
        res.redirect("/login");
    }
});

app.get("/submit", function (req, res) {
    if (req.isAuthenticated) {
        res.render("submit");
    } else {
        redirect("/login");
    }
});

app.post("/submit", function (req, res) {
    const submittedSecret = req.body.secret;
    console.log(req.user.id);
    User.findById(req.user.id).then(function (foundUser) {
        if (foundUser) {
            foundUser.secret = submittedSecret;
            foundUser.save();
            res.redirect("/secrets");
        }
    }).catch(function (err) {
        console.log(err);
    });
});

app.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});



app.listen(3000, function () {
    console.log("Server has started successfully!!");
});



