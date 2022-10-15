require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose=require('mongoose')
const session=require('express-session');
const passport=require('passport');
const passportLocalMongoose=require('passport-local-mongoose');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var findOrCreate = require('mongoose-findorcreate')

const app = express()
const https=require('https')



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(session({
    secret:process.env.secret,
    resave: false,
    saveUninitialized: false,
  }))

app.use(passport.initialize());
app.use(passport.session());
app.listen(3000);
mongoose.connect('mongodb://localhost:27017/MovieDB',{useNewUrlParser: true},()=>{console.log('mongodb connected')});
const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    googleId:String,
    movies:[{
        poster_path:String,
        backdrop_path:String,
        title:String,
        runtime:Number,
        overview:String,
        genre:[{name:String}]
    }]

})
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const user=mongoose.model('movie',userSchema);

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/MOLOG"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    user.findOrCreate({ googleId: profile.id }, function (err, user) {
      user.username=profile.displayName;
      user.save();
      return cb(err, user);
    });
  }
));
passport.use(user.createStrategy());
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
passport.deserializeUser(function(user, cb) {
process.nextTick(function() {
    return cb(null, user);
});
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }))

app.get('/auth/google/MOLOG', 
passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect secrets.
        res.redirect('/search');
});

app.get('/login',(req, res)=>{
    if(req.isAuthenticated()){
        res.redirect('/logout');
    }
    else{
        res.render('login');
    }
})

app.get('/logout',(req, res)=>{
    if(req.isAuthenticated()){
        res.render('logout',{name:req.user.username})
    }
    else{
        res.redirect('/login');
    }
})

app.get('/register',(req, res)=>{
    res.render('register');
})

var movieList={results:[],page:1,total_pages:1};
var movieName="";

app.get('/search',(req, res)=> {
    res.render('search',{list:movieList});
})

app.get('/',(req, res)=> {
    res.redirect('/search');
})



app.post('/search',(req, res)=> {
        if(req.body.Movie==''){
            res.redirect('/search');
        }
        else{
            var endpoint="https://api.themoviedb.org/3/search/movie";
            var apikey="aadcb48591137bb0fe77153744f692c8"
            var page="1"
            var query=req.body.Movie;
            var url=endpoint+'?api_key='+apikey+'&&query='+query+'&&page='+page;
            movieName=query;
            https.get(url,resp=>{
                let chunks = [];
                    resp.on('data', function(data) {
                    chunks.push(data);
                    }).on('end', function() {
                    let data   = Buffer.concat(chunks);
                    movieList=JSON.parse(data);
                    //console.log(movieList);
                    res.redirect('/');
                    }).on('error',()=>{
                        res.redirect('/');
                    })
            })
        }
        
})

app.post('/info',(req, res)=>{
    var endpoint='https://api.themoviedb.org/3/movie/';
        var apikey="aadcb48591137bb0fe77153744f692c8"
        var url=endpoint+req.body.button+'?api_key='+apikey;
        https.get(url,resp=>{
            let chunks = [];
                resp.on('data', function(data) {
                chunks.push(data);
                }).on('end', function() {
                let data = Buffer.concat(chunks);
                //console.log(JSON.parse(data));
                var movie=JSON.parse(data);
                res.render('info',{movie: movie});
                });
        })
})


app.post('/showMore',(req, res)=>{
    var endpoint="https://api.themoviedb.org/3/search/movie";
        var apikey="aadcb48591137bb0fe77153744f692c8"
        var query=movieName;
        var url=endpoint+'?api_key='+apikey+'&&query='+query+'&&page='+(++movieList.page);
        https.get(url,resp=>{
            let chunks = [];
            console.log(resp.statusCode);
            if(resp.statusCode==200){
                resp.on('data', function(data) {
                    chunks.push(data);
                    }).on('end', function() {
                    let data = Buffer.concat(chunks);
                    var nextList=JSON.parse(data);
                    //console.log(nextList);
                    movieList.results.push(...(nextList.results));
                    res.redirect('/');
                    }).on('error', function() {
                        
                    })
            }
            else{
                res.redirect('/');
            }
                
        })
})


app.post("/login", passport.authenticate("local",{
    successRedirect: "/search",
    failureRedirect: "/login"
}), function(req, res){
    
});

app.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/search');
    });
  });

  app.post('/register',(req, res)=>{
    user.register({username:req.body.username}, req.body.password, function(err, user) {
        if (err) {
            console.log(err)
            res.redirect('/register')
        }      
        else{
            passport.authenticate('local')(req,res,()=>{
                res.redirect('/search')
            })
        }
      });
    
})