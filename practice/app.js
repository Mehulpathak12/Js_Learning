const express = require("express");
const path = require('path')
const rootDir = require('./utils/rootDir')
const app = express()
app.use(express.static(path.join(rootDir,'public')))
const home = require('./routes/homeRoutes')
app.use(home);
const port =  3000
app.listen(port,()=>{console.log("App is running on -> http://localhost:" + port)})