const express = require('express');
const mongoose = require('mongoose');

const User=require("../schema/user");
const router=new express.Router() 

router.post('/',async(req,res)=>{
    const user = new User(req.body);
    try{
        await user.save()
        res.status(201).send(user)
    }catch (e){
        res.status(400).send(e)
    }
})

router.get('/',async(req,res)=>{
    try{
        const users=await User.find()
        res.send(users)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        const user=await User.findById(id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
})

router.patch('/:id',async(req,res)=>{
    const {id}=req.params;
    const {name,email,password,age }=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id ${id}`);
    const updatedUser={name,email,password,age, _id:id};
    await User.findByIdAndUpdate(id,updatedUser,{new :true});
    res.json(updatedUser);
})

router.delete('/:id',async(req,res)=>{
    try{
        const  user=await User.findByIdAndRemove(req.params.id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user)
    }catch(e){
        res.status(500).send();
    }
})

router.get("/",(req,res)=>{
    res.json("from user router")
})

module.exports=router