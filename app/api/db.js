const mongoose = require("mongoose");

const options = {};
mongoose.set("strictQuery", false);
const MONGO_URI = "mongodb://127.0.0.1:27017/blogrr";
const MONGO_URI_LIVE = "mongodb+srv://blogrr:blogrr1@cluster0.v9devjw.mongodb.net/";


const connect = async () => {
  await mongoose
    .connect(MONGO_URI_LIVE, options)
    .then((res) => {
      if (res) return console.log("Database Connected");
    })
    .catch((err) => {
      console.log("MongoDB Database Connection Failed: " + err);
    });
};

module.exports = connect;
