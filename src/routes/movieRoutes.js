const express = require("express");
const { getAllMovies,searchMovies,addMovie,updateMovie, deleteMovie } = require("../controllers/movieController");
const isAdmin = require('../../middleware/isAdmin');

const movieRoutes = express.Router();

movieRoutes.get("/movies", getAllMovies);

movieRoutes.get("/search", searchMovies);

movieRoutes.post("/movies", isAdmin, addMovie);

movieRoutes.put("/movies/:id", isAdmin, updateMovie);

movieRoutes.delete("/movies/:id", isAdmin, deleteMovie);

module.exports = movieRoutes;
