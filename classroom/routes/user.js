const express = require("express");
const router = express.Router();

router.get("/login", (req,res)=>{
   res.send("login you account");
   res.cookie("gururaj", "Loves Cookies");
})
router.get("/id", (req,res)=>{
    res.send("login you id");
})
router.get("/login/register", (req,res)=>{
    res.send("register you account");
})
module.exports = router;