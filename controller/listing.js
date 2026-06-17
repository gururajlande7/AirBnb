const listing = require("../models/listing.js");
const ExpressError = require("../utils/expresserror.js");

module.exports.index = async (req,res)=>{
    const listings = await listing.find({});
    res.render("listing/index.ejs", {listings});
}

module.exports.newListing =async (req,res)=>{
    res.render("listing/new.ejs");
}

module.exports.show = async (req,res)=>{
    let {id} = req.params;
    const place = await listing.findById(id)
    .populate({path : "reviews", populate:{path: "author"}})
    .populate("owner");
    if(!place){
        req.flash("error", "Requested listing does not exist");
        return res.redirect("/listing");
    }else{
        res.render("listing/show.ejs", {place})
    }
}

module.exports.postNewListing=async (req,res,next)=>{
    if(!req.file){
        throw new ExpressError(400, "Please upload a listing image");
    }
    let url = req.file.path;
    let filename = req.file.filename;
    let newplace = new listing(req.body.listing);
    newplace.owner = req.user._id; 
    newplace.image = {url, filename};

    await newplace.save();

    req.flash("success", "New listing Saved");
    return res.redirect("/listing");
}

module.exports.editListing = async (req,res)=>{
    let {id} = req.params;
    const place = await listing.findById(id);

     if(!place){
        req.flash("error", "Requested listing does not exist");
        res.redirect("/listing");
    }else{
    return res.render("listing/edit.ejs", {place});}
}

module.exports.updatelisting = async (req, res, next) => {
  try {
    let { id } = req.params;
    const place = await listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });

    if (!place) {
      req.flash("error", "Requested listing does not exist");
      return res.redirect("/listing");
    }

    if (req.file) {
      let url = req.file.path;
      let filename = req.file.filename;
      place.image = { url, filename };
      await place.save();
    }

    req.flash("success", "Listing Updated");
    return res.redirect(`/listing/${id}`);
  } catch (err) {
    return next(err);
  }
};



module.exports.destroy =async (req,res)=>{
    let {id} = req.params;
    let place= await listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    return res.redirect("/listing");
};  
