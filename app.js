require("dotenv").config();

const express = require("express");

const app = express();

const { validateMovie, validateUser } = require("./validators.js");

const port = process.env.APP_PORT ?? 5000;

app.use(express.json());

const welcome = (req, res) => {
    res.send("Welcome to my favorite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

const userHandlers = require("./userHandlers");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", validateUser, userHandlers.postUser);
app.put("/api/users/:id", validateUser, userHandlers.updateUser);

app.listen(port, (err) => {
    if (err) {
        console.error("Something bad happened");
    } else {
        console.log(`Server is listening on ${port}`);
    }
});
