if(process.env.NODE_ENV!= 'production'){
   require("dotenv").config();
 
}

const express = require("express");
const listing = require("../models/listing.js");
const wrapasync = require("../utils/wrapasync.js") ;
const ExpressError = require("../utils/expresserror.js") ;
const {listingSchema} = require("../schema.js") ;
const router= express.Router({ mergeParams : true });
const {isLoggedIn, validatelisting , isOwner, updatelisting} = require("../middleware.js");
const listingController = require("../controller/listing.js")
const multer= require("multer");
const storage = require("../cloudConfig.js");
const upload = multer(storage);

router.route("/")
.get(wrapasync(listingController.index))
.post(isLoggedIn ,upload.single("listing[image]"),
        validatelisting,wrapasync(listingController.postNewListing))


router
.get("/new", isLoggedIn ,wrapasync(listingController.newListing))

router
.route("/:id")
.get(wrapasync(listingController.show))
.put(isLoggedIn, isOwner, upload.single("listing[image]"),
        validatelisting, wrapasync(listingController.updatelisting))

router
.get("/:id/edit", isLoggedIn , isOwner ,wrapasync(listingController.editListing))

router
.delete("/:id", isLoggedIn, isOwner, wrapasync(listingController.destroy))

router
.get("/:id/delete", isLoggedIn, isOwner, wrapasync(listingController.destroy))

module.exports= router;
