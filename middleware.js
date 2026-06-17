const listing = require("./models/listing.js");
const ExpressError = require("./utils/expresserror.js") ;
const {listingSchema} = require("./schema.js") ;
const {reviewSchema} = require("./schema.js") ;
const review = require("./models/review.js") ;

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirectUrl = req.session.redirecturl ; 
    }next();
} 

module.exports.validatelisting = (req,res,next)=>{
    const {error} = listingSchema.validate(req.body) ;
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
} 

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    const plc =  await listing.findById(id) ;
    if(!plc){
        req.flash("error", "Requested listing does not exist");
        return res.redirect("/listing");
    }
    if(!plc.owner._id.equals(res.locals.cuser._id)){
        req.flash("error" , "You are not owner of this Listing");
        return res.redirect(`/listing/${id}`);
    }
    next();
}
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirecturl= req.originalUrl;
        req.flash("error","Login required");
        return res.redirect("/login");
    } next();
};

module.exports.reviewsystem = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        return next(new ExpressError(400, errMsg));
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req,res,next)=>{
    let { id, reviewId} = req.params;
    const delreview =  await review.findById(reviewId) ;
    if(!delreview){
        req.flash("error", "Review does not exist");
        return res.redirect(`/listing/${id}`);
    }
    if(!delreview.author._id.equals(res.locals.cuser._id)){
        req.flash("error" , "You are not author of this review");
        return res.redirect(`/listing/${id}`);
    }
    next();
}
