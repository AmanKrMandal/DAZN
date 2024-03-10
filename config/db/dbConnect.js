const mongoose = require("mongoose");

const dbConnect = async () => {
  const url =
    "mongodb+srv://test1:asdf1234@cluster0.ml21iuj.mongodb.net/dazn?retryWrites=true&w=majority";
  try {
    await mongoose.connect(url);
    console.log("Db is Connected Successfully");
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};

module.exports = dbConnect;
