const express = require("express");
const bcrypt = require('bcrypt')
const userModel = require('./models/user');
const postModel = require('./models/post')
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')
const app = express()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.get("/",(req,res)=>{
    console.log("1");
    
    res.render('index')
})
app.post("/register",async (req,res)=>{
    let {email,username,name,password,age} = req.body
    let user = await userModel.findOne({email})
    if(user) return res.status(500).send("user already registered")
    console.log("Visitied");
        
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
        if (err) throw err;
        let user = await userModel.create({
            username,
            email,
            age,
            name,
            password: hash
        })
        let token = jwt.sign({
            email:email,
            userid:user._id
        },"mehul")
        res.cookie("token",token);
        res.send("registered")
        });
    });
})  

app.get('/login',(req,res)=>{
    res.render("login")
})

app.post("/login",async (req,res)=>{
    let {email,password} = req.body; 
    let user = await userModel.findOne({email})
    if(!user) return res.status(500).send("Something Went Wrong!")
    await bcrypt.compare(password,user.password,(err,result)=>{
    if(result){
        let token = jwt.sign({
            email:email,
            userid:user._id
        },"mehul")
        console.log(token);
        res.cookie("token",token)
        res.send("done")
        }else
            res.send("not");
    }) 
})
app.get("/logout",(req,res)=>{
    res.cookie("token","")
    res.render("login")
})

app.post("/post",isloggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email})
    console.log("hii");
    
    let post  = await postModel.create({
        user: user._id,
        content:req.body.posttext
    })
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile")
})
app.post("/update/:id",async (req,res)=>{
    let post = await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.posttext})
    res.redirect("/profile")
})
app.get("/edit/:id",async (req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user");
    res.render("edit",{post})
})
app.get("/like/:id",isloggedIn,async (req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user");
    console.log(post);
    
    if(post.likes.indexOf(req.user.userid) === -1)
    {
        post.likes.push(req.user.userid)
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1)
    }
    await post.save();
    res.redirect('/profile')
})
app.get("/profile",isloggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate("posts");
    res.render('profile',{user})
})
function isloggedIn(req,res,next){
    if(req.cookies.token === "") res.send("Your should Logged in")
    else{
        // console.log(req.cookies.token);
        let data = jwt.verify(req.cookies.token,"mehul")
        // console.log(data);
        req.user = data
        next()
    }
}
app.listen(3000,()=>{
    console.log("http://localhost:3000");
})