const express = require('express')
const rootDir = require('./utils/rootDir')
const path = require('path')
const homeRouter = require('./routes/homeRoutes')
const app = express()
// as data from client side is coming from in blob(an un readable format) that cannot be understand by the server.
//for this we uses these two lines that allow us to read data from the client side.\
//this is line is used to read json format data
app.use(express.json())
//this is line is used to read the data that has been submited by the forms, etc.
app.use(express.urlencoded({extended:true}));

//setting up ejs
app.set('view engine', 'ejs');
app.set('views','views');
//making public directory easily accessibl so we can  directly use it storing and using images and some static files
app.use(express.static(path.join(rootDir,'public')));
app.use(homeRouter)
//error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

const port = 3000;
app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})