const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const ConnectionDb = require("./config/db");
const testRoute = require("./routes/testRoute");

//PORT
const PORT = process.env.PORT || 8080;

//rest object
const app = express();

//connect to db
ConnectionDb();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("short"));

//route
//URL=>http://localhost/:8080
app.use("/api/v1/test", testRoute);

app.get("/", (req, res) => {
  res.status(201).send("<h1>Welcome to Food Server</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});
