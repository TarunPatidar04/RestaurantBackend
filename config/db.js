const mongoose = require("mongoose");

//function mongodb connection
const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        console.log("Connected to DataBase");
      })
      .catch((error) => {
        console.log("Database error", error);
      });
  } catch (error) {
    console.log("Database connection error", error);
  }
};

module.exports = connectDb;
