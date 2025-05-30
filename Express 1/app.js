//this is the code creted with http core module
// const http = require('http')
// const express = require('express')
// require('dotenv').config()
// const app = express()
// const server  = http.createServer(app)
// const port =  process.env.PORT
// server.listen(port,()=>{
//     console.log("Server is running at ->  http://localhost:" + port);
// })
//this is the code created with only express
const express = require('express')
require('dotenv').config()
const app = express()
const port =  process.env.PORT
app.use((req,res,next)=>{
    console.log("First middlewear calling",req.path,req.method)
    next()
})
app.use((req,res,next)=>{
    console.log("Second Middlewear called",req.path,req.method);
    next()
})
// app.use((req,res,next)=>{
//     console.log("Third Middlewear called",req.path,req.method);
//     res.send("<h1>Third middle wear</h1>")
// })
app.get("/", (req, res) => {
  console.log("Handling routes");
  res.send(`<h1>/routes`);
});
app.listen(port,()=>{
    console.log("Server is running at ->  http://localhost:" + port);
})