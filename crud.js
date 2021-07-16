// basic CRUD Application

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const validator = require('validator');


app.set('view engine','ejs');
app.set('views', 'views');
app.use(express.static('public')); // middleware for serving static files
app.use(express.urlencoded());

mongoose.connect("mongodb://localhost/Electricity" ,{useNewUrlParser: true, useUnifiedTopology: true});

var studentSchema = new mongoose.Schema({
      name : {
        type : String,
        required : true,
      },
      course : String,
      age : Number,
      email :{
        type: String,
        required : true,
        validate(value){
          if( !(validator.isEmail(value))){
            throw new Error("incorrect email entered");
          }
        }
      }
});

var student_Collection = new mongoose.model('student',studentSchema);

app.get('/', (req,res) => {
  res.render("crud",{pagetitle:'CRUD'});
});

app.post('/submit', (req,res) => {
  const student_Data = new student_Collection({
     name : req.body.name,
     course : req.body.course,
     age : req.body.age,
     email : req.body.email
  });
   // student_Data.save((err,student_Data) => {
   //    if(err) console.log(err);
   // });
   student_Collection.insertMany([student_Data]);
  res.render("emp_details");
});

app.get('/getData', (req,res) => {
   student_Collection.find({}).then(function (students){
     // console.log(students);
    res.render("student_data",{students});
   });
});

app.get('/updateData/:student_name', (req,res) => {
   student_Collection.find({ name : req.params.student_name }).then(function (students){
     console.log(students);
    res.render("student_data_form",{students});
   });
});

app.post('/update/:student_name', (req,res) => {
  name = req.body.name;
  course = req.body.course;
  age = req.body.age;
  email = req.body.email;
  student_Collection.updateMany({name : req.params.student_name},{ $set:{name,course,age,email}},
    function(err,result){
        if(err) console.log(err);
        else{
            console.log(result);
          res.render("emp_details");
        }
    });
});

app.get('/delete/:student_name', (req,res) => {
  student_Collection.deleteOne({name : req.params.student_name},
    function(err,result){
        if(err) console.log(err);
        else{
            console.log(result);
          res.send("deleted");
        }
    });
});

app.listen(5001,() => {
  console.log("listening on port : 5001");
});
