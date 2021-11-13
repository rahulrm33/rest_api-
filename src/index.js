const express = require("express");
require('./database');
const app=express();
const userRouter=require('./routers/user')

app.use(express.json());
app.use("/user",userRouter);

app.get("/",(req,res)=>{
    res.json("hii there");
})

app.listen(5000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 5000);
})