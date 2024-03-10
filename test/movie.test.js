const request = require("supertest");
const app = require("../index");
const Movie = require("../src/models/Movie");

const mockMovie = {
  title: "Test Movie",
  genre: "Test Genre",
  rating: 8.0,
  streaming_link: "https://example.com/testmovie",
};

beforeEach(async () => {
  await Movie.deleteMany();
});

describe("GET /movies", () => {
  it("should return all movies in the lobby", async () => {
    await Movie.create(mockMovie);
    const response = await request(app).get("/api/movies");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe(mockMovie.title);
  });
});

describe("GET /search", () => {
  it("should return movies matching the search query", async () => {
    await Movie.create(mockMovie);
    const response = await request(app).get("/api/search?q=Test");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe(mockMovie.title);
  });
});

describe("POST /movies", () => {
  it("should add a new movie to the lobby", async () => {
    const response = await request(app).post("/api/movies").send(mockMovie);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(mockMovie.title);
  });
});

describe("PUT /movies/:id", () => {
  it("should update an existing movie", async () => {
    const newMovie = await Movie.create(mockMovie);
    const updatedGenre = "Updated Genre";
    const response = await request(app)
      .put(`/api/movies/${newMovie._id}`)
      .send({ genre: updatedGenre });
    expect(response.status).toBe(200);
    expect(response.body.genre).toBe(updatedGenre);
  });
});

describe("DELETE /movies/:id", () => {
  it("should delete an existing movie", async () => {
    const newMovie = await Movie.create(mockMovie);
    const response = await request(app).delete(`/api/movies/${newMovie._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Movie deleted successfully");
  });
});
