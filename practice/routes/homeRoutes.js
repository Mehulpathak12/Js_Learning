const express = require('express');
const path = require('path')
const rootDir = require("../utils/rootDir")
const homeRouter =  express.Router();
homeRouter.get("/", (req, res) => {
    console.log("this is the home page");
    res.sendFile(path.join(rootDir,'views','home.html'));
});
module.exports = homeRouter;