const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("short"));

//PORT
const PORT = process.env.PORT || 8080;

//route
app.get("/", (req, res) => {
  res.status(201).send("<h1>Welcome to Food Server</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});
