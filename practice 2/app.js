//requiring modules
const express = require('express');
const path = require('path');
const rootDir = require('./utils/rootDir');
//requiring routes from local file
const homeRoutes = require('./routes/homeRoute')
//asingning express functionality to a variable
const app = express();
//assiging the view engine
app.set('view engine','ejs')
app.set('views',path.join(rootDir,'views'))
//using middleware for reading the data coming from the client side
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//assigning public static folder
app.use(express.static(path.join(rootDir,'public')))

//using routes
app.use(homeRoutes);

//middlewear for error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
})