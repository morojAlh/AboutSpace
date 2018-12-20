var express = require('express');
var router = express.Router();

var movie = require('../models/movie');
var user = require('../models/user');

router.get('/', movie.getAll, renderIndex);
router.get('/new', renderNew);
router.get('/:id', movie.find, movie.findByUser, renderShow);

router.post('/', movie.create, redirectMovieShow);
router.post('/:id', movie.addMovie, redirectMovieShow);

router.post('/:id/register', movie.addMovie, redirectShow);
router.delete('/:id/register', movie.removeMoviefromUser, redirectShow);

function renderIndex(req, res){
    var isAdmin = false;
    if (req.session.user){
        if (req.session.user.type == 'admin'){
            isAdmin = true;
        }
        var mustacheVariables = {
            movies: res.locals.movies,
            isAdmin: isAdmin
        }
    }
    // console.log("index movie", res.locals.isAdmin);
    res.render('./movie/index',mustacheVariables);
}

function renderShow(req, res){
    var mustacheVariables;
    if (req.session.user){
        mustacheVariables = {
            movie: res.locals.movie,
            isFavorite: res.locals.isFavorite,
            user: req.session.user 
        }
    } else {
        mustacheVariables = {
            movie: res.locals.movie,
            user: req.session.user 
        }
    }
    res.render('./movie/show',mustacheVariables);
}

function renderNew(req, res){
    res.render('./movie/new');
}

function redirectMovieShow(req, res){
    res.redirect(`/movies`);
}

function redirectShow(req, res){
    res.redirect(`/movies/${res.locals.movie_id}`);
}

module.exports = router;