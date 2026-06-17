const express = require("express");
const app = express();
const users = require("./routes/user.js");
const cookieParser = require('cookie-parser')
const session = require("express-session")

app.use(cookieParser());
app.use(session({secret:"secretkey", resave:false, saveUninitialized:true }))


app.get("/request" , (req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send(`it your ${req.session.count} session`)
})


// app.get("/", (req,res)=>{
//     console.dir(req.cookies)
//      res.send("hello")
// })

// app.get("/login", (req,res)=>{
//     res.cookie("gururaj", "Loves-Cookies");
//     res.send("login you account");
   
// })
// app.use("/user", users);

app.listen(3000,()=>{
    console.log("Hi ");
})