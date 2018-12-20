var express = require('express');
var router = express.Router();

var user = require('../models/user');
var auth = require('../middleware/auth');

router.get('/', auth.onlyUsers, renderIndex);

// router.get('/', renderNew);
router.get('/:id', auth.onlyUsers, user.getMovieByuser, user.getAppByuser , user.find, renderShow);

router.post('/', user.create, redirectShow);

router.put('/:id', user.update, redirectShow);
// router.post('/addApp', user.addApp, redirectAppShow);
// router.post('/addMoive', user.addMovie, redirectMovieShow);

// function renderNew(req, res){
//   res.render('./signin/index');
// }

function renderIndex(req, res){
 res.render('./profile/index');
}

function renderShow(req, res) {
//   console.log(req.session.user);
// console.log(res.locals.favoriteMovie);
  var mustacheVariables = {
    user: res.locals.user,
    apps: res.locals.favoriteApp,
    movies: res.locals.favoriteMovie
  }
  res.render('./profile/show', mustacheVariables);
}

function redirectShow(req, res) {
  res.redirect(`/profile/${res.locals.userId}`);
}

// function redirectAppShow(req, res){
//     res.redirect(`/apps`);
// }

// function redirectMovieShow(req, res){
//     res.redirect(`/apps/${res.params.id}`);
// }

module.exports = router;