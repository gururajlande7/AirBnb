const express = require("express");
const methodoverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");  
const app = express();
const ExpressError = require("./utils/expresserror.js") ;
const user =  require("./routes/user.js");
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport");
const LocalStatergy = require("passport-local");


const User = require("./models/user.js");
const listingRoute = require("./routes/listing.js");
const reviewRoute =  require("./routes/review.js");

app.engine("ejs", ejsMate);                          
app.set("view engine", "ejs");                     
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


const sessionOption={
    secret:"mysecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStatergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

let mongo_url="mongodb://127.0.0.1:27017/bhurr";

main().then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(mongo_url)
}

app.get("/",(req,res)=>{
    res.redirect("/listing");
})

app.use((req,res,next)=>{
    res.locals.success= req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.cuser = req.user;
    next();
})

app.get("/demo",async(req,res)=>{
    let fakeuser = new User({
        email:"guru@gmail.com",
        username: "guru"
    })
    let regiuser= await User.register(fakeuser, "guru");
    res.send(regiuser);
})


app.use("/listing", listingRoute);
app.use("/listing/:id/review", reviewRoute);
app.use("/", user);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { err: { status, message } });
});


app.listen(8080,()=>{
    console.log("all good");
})
