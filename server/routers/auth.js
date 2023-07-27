const express =require('express')
const router = express.Router()
const User=require('../models/userModel')
router.get('/',async(req,res)=>{
  try{
    const username=req.query.username
    const email=req.query.email
    console.log(email)
    const user = await User.findOne({email:email})
    // console.log(user)
    if(user){
      res.send(user)
    }
    else{
      const newUser= {
        username:`${username}` , 
        email:`${email}` ,
        movies: []
        }
      User.create(newUser).then((user)=>{
        console.log(user)
      })
      res.send(newUser)

    }
  }
  catch(err){
    console.log(error)
    res.send(err)
  }
})


router.get('/find',async(req,res)=>{
  try{
    const email=req.query.email
    console.log(email)
    const user = await User.findOne({email:email})
    // console.log(user)
    if(user){
      res.send(user)
    }
    else{
      res.send({username:null})
    }
  }
  catch(err){
    console.log(error)
    res.send(err)
  }
})


module.exports=router