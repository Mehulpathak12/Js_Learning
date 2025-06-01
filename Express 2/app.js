const express = require("express");
const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.urlencoded())
app.get("/", (req, res) => {
  res.send(`<h2>User Information</h2>
      <form action="/submit" method="post">
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" required><br><br>

        <label for="age">Age:</label><br>
        <input type="number" id="age" name="age" min="0" required><br><br>

        <button type="submit">Submit</button>
      </form>`);
});
app.post("/Submit", (req, res) => {
    let {name, age} = req.body;
    console.log("first route visited" + req.url + req.body)
    res.send(`Your Name is ${name} <br> Your Age is ${age}`)
});
const port = 3000;
app.listen(port, () => `Server running on port ${port}`);