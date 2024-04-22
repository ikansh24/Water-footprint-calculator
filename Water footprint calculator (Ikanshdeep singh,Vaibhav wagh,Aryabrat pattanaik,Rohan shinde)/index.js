const express = require("express")
const mongoose = require("mongoose")

const app = express();
const port = 5000

app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }));



mongoose.connect('mongodb://127.0.0.1:27017/ProjectData')
  .then(() => {
    console.log("Database Connection Done")
    }).catch(() => {
    console.log("something went wrong")
})

const User = require("./model/user")


app.get("/", (req, res) => {
  res.render("index")
})

app.post("/", async(req, res) => {
  const data = new User(req.body)
  await data.save()
  res.send("Feedback submitted")
})

app.listen(port, () => {
})

