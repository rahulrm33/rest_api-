const mongoose =require("mongoose");

mongoose.connect("mongodb://localhost:27017/ktern_ass",(err)=>{
    if(!err){
        console.log("db connected successfully!");
    }
})