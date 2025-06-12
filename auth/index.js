let express = require('express')
let cookieParser = require('cookie-parser')
let userModel = require('./models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
let path = require('path')
let app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views','views')
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())
// Routes
app.get("/", (req, res) => {
  res.render('index')
});
app.post("/create",(req,res)=>{
    let {username,password,email,age} = req.body
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                username,email,password:hash,age
            })
            let token = jwt.sign({email},"mehul")
            res.cookie("token",token)
            res.send(createdUser)
        });
    });
    
})
app.get("/logout",(req,res) => {
    res.cookie("token","")
    res.send("done")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async (req,res)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(!user) return res.send("Something Went Wrong!")
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(result){
            let token = jwt.sign({email:user.email},"mehul")
            res.cookie("token",token)
            res.send("You can login")
        }
        else res.send("Something went wrong!")
    })
})
// Connection
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log('App running in port: http://localhost:'+PORT)
})