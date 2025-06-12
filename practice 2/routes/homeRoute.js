const express = require('express');
const rootDir = require('../utils/rootDir');
const path = require('path')
const homeRoutes = express.Router();
//this is the normal function that is doing get request as per the demand
homeRoutes.get("/",function(req,res){
    res.render('index')
})

module.exports = homeRoutes