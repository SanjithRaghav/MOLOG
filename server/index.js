const dotenv=require('dotenv')
dotenv.config();
const path=require('path')
const express = require('express')
const app = express();
const bodyParser=require('body-parser')
const cors=require('cors');
const mongoose = require('mongoose');

app.use(express.json())
app.use(cors());
mongoose.connect(process.env.MONGO_URI)

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

