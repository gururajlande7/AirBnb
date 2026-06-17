const express = require("express");
const router= express.Router();
const user = require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js") ;
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controller/user.js");

router.route("/signup")
    .get(userController.renderSignup)
    .post(wrapasync(userController.signup));

router.route("/login")
    .get(userController.renderlogin)
    .post(saveRedirectUrl,passport.authenticate("local" , {
    failureFlash:true, failureRedirect:"/login", 
    }) ,wrapasync(userController.login))


router.get("/logout", (userController.logout))

module.exports =router;