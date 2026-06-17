const mongoose= require("mongoose");
const initData= require("./data");
const listing = require("../models/listing");

let mongo_url="mongodb://127.0.0.1:27017/bhurr";

main().then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err);
})


async function main() {
    await mongoose.connect(mongo_url)
}

let init= async ()=>{
    await listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj , owner:"69c8dfed9c33e4950db8f66d"}));
    await listing.insertMany(initData.data);
    console.log("data inserted");
}

init();