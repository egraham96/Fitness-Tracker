const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const api = require('./routes/index.js');
require("dotenv").config();


const PORT = process.env.PORT || 3020;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use('/api', api);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
 {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

