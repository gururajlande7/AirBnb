const mongoose=require("mongoose");
const review = require("./review.js");
const User = require("./user.js");
const Schema= mongoose.Schema;

let listingschema= new Schema({
    title:{
        type: String,required: true
    },
    description:String,
    image:{
        url:String , img_name:String,
    },
    price:Number,
    location:String, 
    country:String
    ,reviews:[
        {
            type:Schema.Types.ObjectId, ref:"reviews"
        }
    ]
    , owner: {type: Schema.Types.ObjectId , ref:'User' }
})
listingschema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await review.deleteMany({_id :{$in :listing.reviews } })
    }
})




const listing =  mongoose.model("listing",listingschema);

module.exports = listing;