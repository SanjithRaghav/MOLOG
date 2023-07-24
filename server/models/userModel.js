const mongoose = require('mongoose')


const User = new mongoose.Schema(
    {
    email:{type:String,required:true,unique:true} ,
    username:{type:String,required:true} , 
    movieList: [ 
      {
        name: String, 
        movies: [ 
          {
            id:String,
            title: String, 
            backdrop_path: String, 
            poster_path: String, 
            overview: String, 
            watched:Boolean, 
          },
        ]
      },
    ]
    }
    ,{collection:"movieSite"}
);

const model=mongoose.model('User',User);

module.exports = model



