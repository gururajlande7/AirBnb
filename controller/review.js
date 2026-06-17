const review = require("../models/review.js") ;
const listing = require("../models/listing.js");
const {reviewSchema} = require("../schema.js") ;
const ExpressError = require("../utils/expresserror.js") ;




module.exports.postReview =async (req, res) => {
    const listing1 = await listing.findById(req.params.id);
    if (!listing1) {                                        
        throw new ExpressError(404, "Listing not found");
    }
    const newReview = new review(req.body.review);
    newReview.author = req.user._id ; 
    listing1.reviews.push(newReview);
    await newReview.save();
    await listing1.save();
     req.flash("success", "Review added");
     return res.redirect(`/listing/${req.params.id}`);
}

module.exports.destroyReview= async(req,res)=>{
    let{id,reviewId}=req.params;

    await listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});

    await review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted");
    return res.redirect(`/listing/${id}`);

}
