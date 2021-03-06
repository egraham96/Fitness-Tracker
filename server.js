const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');
require("dotenv").config();



const PORT = process.env.PORT || 3020;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/FitnessTracker", 
 {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//API Routes
app.use(require("./routes/Apiroutes.js"));

//Routes for Static Pages
 app.get("/", function (req ,res){
    res.sendFile(path.join(__dirname, "/public/index.html"))
  })

  app.get("/exercise", function (req ,res){
    res.sendFile(path.join(__dirname, "/public/exercise.html"))
  })
  
  app.get("/stats", function (req ,res){
    res.sendFile(path.join(__dirname, "/public/stats.html"))
  })


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

