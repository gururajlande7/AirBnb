const express = require("express");
const router= express.Router({mergeParams:true});
const listing = require("../models/listing.js");
const wrapasync = require("../utils/wrapasync.js") ;
const ExpressError = require("../utils/expresserror.js") ;
const {reviewSchema} = require("../schema.js") ;
const review = require("../models/review.js") ;
const { reviewsystem,isLoggedIn , isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controller/review.js");



router.post("/",isLoggedIn, reviewsystem, wrapasync(reviewController.postReview))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor , wrapasync(reviewController.destroyReview))

module.exports = router;