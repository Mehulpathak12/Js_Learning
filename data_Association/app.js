const express = require("express");
const path = require("path")
const app = express()

const userModel = require('./models/user')
const postModel =  require("./models/post")


app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.get("/",(req,res)=>{
    res.send("data");
})

app.get("/create",async (req,res)=>{
    let user = await userModel.create({
        username:"Mehul",
        age:25,
        email:"Mehulpathak@gmail.com"
    })
    res.send(user)
})

app.get("/post/create",async (req,res)=>{
    let post = await postModel.create({
        postdata:"hello!",
        user:""
    })
    let user = await userModel.findOne({_id:""})
    user.posts.push(post._id);
    await user.save();
    res.send({post,user});
})
app.listen(3000,()=>{
    console.log("http://localhost:3000");
})