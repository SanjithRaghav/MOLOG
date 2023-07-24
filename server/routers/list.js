const express=require('express')
const router=express.Router()
const User=require('../models/userModel')


router.get("/addList",async (req,res)=>{
    const email=req.query.email
    try{
        await User.updateOne(
            {email:email},
            {$push:{movieList:{name:req.query.listName,movies:[]}}}
        )
        const user=await User.findOne({email:email})
        res.json(user)
    }catch(err){
        console.log(err)
        res.send(err)
    }

})

router.get("/removeList",async (req,res)=>{
    const email=req.query.email
    try{
        await User.updateOne(
            {email:email},
            {$pull:{movieList:{name:req.query.listName}}}
        )
        const user=await User.findOne({email:email})
        res.json(user)
    }catch(err){
        console.log(err)
        res.send(err)
    }

})







module.exports=router