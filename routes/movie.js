const express = require('express');

const router = express.Router();

const movie = require('../models/movies');
router.get('/', async function(req, res) {

    try {

        let filteredMovies = new Object();

        const { name, director, genre, year, sort, select } = req.query;

        if (select) {
            var newselect = select.split(',').join(' ');
            filteredMovies = await movie.find({}).select(newselect);
        } else
            filteredMovies = await movie.find({});

        // Filtering based on query parameters with regex
        if (name) {
            const regexName = new RegExp(name, 'i'); // 'i' flag for case-insensitive search
            filteredMovies = filteredMovies.filter(movie => regexName.test(movie.name));
        }

        if (director) {
            const regexDirector = new RegExp(director, 'i');
            filteredMovies = filteredMovies.filter(movie => regexDirector.test(movie.director));
        }

        if (genre) {
            const regexGenre = new RegExp(genre, 'i');
            filteredMovies = filteredMovies.filter(movie => regexGenre.test(movie.genre));
        }

        if (year) {
            const regexYear = new RegExp(year);
            filteredMovies = filteredMovies.filter(movie => regexYear.test(movie.year.toString()));
        }

        if (sort) {
            var str = req.query.sort;
            filteredMovies.sort(byField(str));
        }
        // Return the filtered results



        res.json({ movies: filteredMovies });





    } catch (err) {
        console.log("response error", err);
    }
});

const byField = (f) => {
    return (a, b) => a[f] > b[f] ? 1 : -1;
}
module.exports = router;