const express = require('express')
const app = express();
const bodyParser=require('body-parser')
const cors=require('cors');
const mongoose = require('mongoose');

app.use(express.json())
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/movieSite",{useNewUrlParser:true})

const con = mongoose.connection
con.on('open', ()=>{
    console.log("connected to database")
}) 
const listRouter=require('./routers/list')
const authRouter=require('./routers/auth')
const moviesRouter=require('./routers/movies')




app.use('/auth', authRouter)
app.use('/list',listRouter)
app.use('/movies',moviesRouter)



app.listen(3000);

