/*
add movies to a list
remove movies from a list
update watched 
remove watched
*/

const express=require('express')
const router=express.Router()
const User=require('../models/userModel')

router.post('/addMovie',async (req,res)=>{
    try{
        await User.updateOne(
            {"email":req.body.email},
            {$push:{"movies":req.body.movie}}
        )
        const user=await User.findOne({email:req.body.email})
        res.json(user)
    }catch(error){
        res.send(error)
    }
})

router.post('/removeMovie',async (req,res)=>{
    try{
        await User.updateOne(
            {"email":req.body.email},
            {$pull:{"movies":{"id":req.body.movie.id}}}
        )
        const user=await User.findOne({email:req.body.email})
        res.json(user)
    }catch(error){
        console.log(error)
        res.send(error)
    }
})


router.post('/updateMovie',async (req,res)=>{
    try{
        await User.updateOne(
            {"email":req.body.email},
            {$set:{"movies.$[x]":req.body.movie}},
            {arrayFilters: [
                {"x.id": req.body.movie.id}
            ]}
        )
        const user=await User.findOne({email:req.body.email})
        res.json(user)
    }catch(error){
        console.log(error)
        res.send(error)
    }
})


module.exports=router