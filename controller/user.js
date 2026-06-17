const user = require("../models/user.js");

module.exports.signup=async (req,res,next)=>{
    try{let {username,email,password} = req.body;
    const newUser =await  new user({email,username});
    let regiuser = await user.register(newUser , password);

    req.login(regiuser , (err)=> {
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to Bhurr")
          return res.redirect("/listing");
    })
    }catch(e){
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
}

module.exports.renderSignup = (req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.renderlogin =(req,res)=>{
    res.render("user/login");}

module.exports.login = (req,res)=>{
    req.flash("success","Welcome back");
    let redirectUrl= res.locals.redirectUrl || '/listing';
    return res.redirect(redirectUrl);
}

module.exports.logout= (req,res,next)=>{
    req.logout((err)=>{if(err){next(err)}
    req.flash("success", "Logged out");
     return res.redirect("/listing");
})
}
