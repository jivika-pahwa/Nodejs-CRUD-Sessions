// 1. counting number of visitors who visits the site using session
// 2. Downloading any file using express.js

var express = require('express');
var app = express();
var session = require('express-session');

app.use(express.static('public'));

app.set('view engine','ejs');
app.use(session({secret:'my secret key',resave:true,saveUninitialized:true}));


app.get('/session',(req,res) => {
// Remeber during declaration of any variable its default value is 0. (viewers = 0)
    if(req.session.viewers) { // at second this will execute
      req.session.viewers++;
      res.send('<p> No. of views: ' + req.session.viewers + '</p>');
      // res.end();
    }
    else{
      req.session.viewers = 1; // first this will execute
      res.send("New Session started");
      // res.end();
    }

});
let visited = 0;
app.get('/session_name', function(req,res){
  req.session.name = 'Jivika Session';
  visited++;
  var name = req.session.name;
  res.send(name+ " visited : "+visited+" times");
  console.log(name);
});

app.get('/', (req,res) => {
    res.send("number of visitors : "+req.session.viewers);
});

app.get('/file_Download', (req,res) => {
    res.render('file_Download');
});

app.post('/file_Download', (req,res) => {
      // console.log("file downloaded !!");
      // res.sendFile(__dirname+'/public/jivika.html'); // sendFile for serving static files like HTML
      res.download('./public/My_Resume.pdf'); // any type of file can be downloaded.

});

app.listen(5001,() => {
  console.log("port is activated !!");
});
