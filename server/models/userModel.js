const mongoose = require('mongoose')


const User = new mongoose.Schema(
    {
    email:{type:String,required:true,unique:true} ,
    username:{type:String,required:true} , 
    movies: [ 
          {
            id:String,
            title: String, 
            backdrop_path: String, 
            poster_path: String, 
            overview: String, 
            watched:Boolean,
            genre:[],
            popularity:Number,
            year:Number
          },
        ]
    }
    ,{collection:"movieSite"}
);

const model=mongoose.model('User',User);

module.exports = model



