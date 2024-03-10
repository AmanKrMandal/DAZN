const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./config/db/dbConnect");
const movieRoutes = require("./src/routes/movieRoutes");

const app = express();

// DB
dbConnect();

//Middleware
app.use(express.json());

//cors
app.use(cors());

// Users route
app.use("/api", movieRoutes);

//serveri
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running ${PORT}`));

module.exports = app;
