const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const https=require('https')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))
app.set('view engine', 'ejs');

var movieList={results:[],page:1,total_pages:1};
var movieName="";
app.listen(3000);
app.get('/',(req, res)=> {
    res.render('search',{list:movieList});
})



app.post('/',(req, res)=> {
    if(req.body.button=='search'){
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
    else if(req.body.button=='showMore'){
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
    }
    else{

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
    }
})