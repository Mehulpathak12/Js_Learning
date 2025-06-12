const express = require('express')
const app = express()
const userModel = require('./userModel')
app.get("/",(req,res)=>{
    res.send("Hey")
})
app.get("/create",async (req,res)=>{
    let createdUser = await userModel.create({
        name:"Mehul",
        email:"mehul@gmail.com",
        username:"Mehulpathak"
    })
    res.send(createdUser);
})

app.get("/update", async (req,res) => {
    let user =  await userModel.findOneAndUpdate({username:"Mehulpathak"},{name:"Lord Mehul"},{new:true});
    res.send(user)
})
app.get("/read", async (req,res) => {
    let user =  await userModel.find()
    res.send(user)
})
app.get("/find/:Uname", async (req,res) => {
    let Uname = req.params.Uname
    console.log(Uname);
    
    let user =  await userModel.findOne({name:Uname})
    console.log(user);
    
    res.send(user)
})
const port = 3000;

app.listen(port, () => console.log(`Server running on http://localhost:${port} 🔥`));