const express = require('express');
const path = require('path')
const rootDir = require("../utils/rootDir")
const homeRouter =  express.Router();
homeRouter.get("/", (req, res) => {
    console.log("this is the home page");
    res.sendFile(path.join(rootDir,'views','home.html'));
});
homeRouter.post("/submit", (req, res) => {
    let {name, age} = req.body;
    console.log("first route visited" + req.url + req.body)
    res.send(`Your Name is ${name} <br> Your Age is ${age}`)
});
module.exports = homeRouter;