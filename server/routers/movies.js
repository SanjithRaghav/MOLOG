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
        const list=await User.find({"email":req.body.email,"movieList.name":req.body.listName})
        console.log(list.length)
        if(list.length==0){
            console.log("hello")
            await User.updateOne(
                {email:req.body.email},
                {$push:{movieList:{name:req.body.listName,movies:[]}}}
            )
        }
        await User.updateOne(
            {"email":req.body.email,"movieList.name":req.body.listName},
            {$push:{"movieList.$.movies":req.body.movie}}
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
            {"email":req.body.email,"movieList.name":req.body.listName},
            {$pull:{"movieList.$.movies":{"id":req.body.movie.id}}}
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
            {$set:{"movieList.$[].movies.$[x]":req.body.movie}},
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