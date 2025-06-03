const express = require('express');
const rootDir = require('../utils/rootDir');
const path = require('path')
const homeRoutes = express.Router();
//this is the normal function that is doing get request as per the demand
homeRoutes.get("/",function(req,res){
    console.log("hello");
    // res.sendFile(path.join(rootDir,'views','home.html'));
    res.render('index')
})
// this request is unique because it is taking input in the url a special method in which user can input there name, this is the part of dynamic routing 
homeRoutes.get("/profile/:username",(req,res)=>{
    res.send(`Hello ${req.params.username}`)
})
// this is the sample route that is taking input from the user there will 2 input from the user in url one thier name and other is their age
homeRoutes.get("/profile/:username/:age",(req,res)=>{
    res.send(`Hey ${req.params.username} <br> Your age is ${req.params.age}`)
})

module.exports = homeRoutes