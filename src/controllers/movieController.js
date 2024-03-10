const Movie = require("../models/Movie");

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchMovies = async (req, res) => {
  const { q } = req.query;
  try {
    const movies = await Movie.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { genre: { $regex: q, $options: "i" } },
      ],
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addMovie = async (req, res) => {
  const { title, genre, rating, streaming_link } = req.body;
  try {
    const newMovie = new Movie({ title, genre, rating, streaming_link });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};
