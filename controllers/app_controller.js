var express = require('express');
var router = express.Router();

var app = require('../models/app');
var user = require('../models/user');

router.get('/', app.getAll, renderIndex);
router.get('/new', renderNew);
router.get('/:id', app.find, app.findByUser, renderShow);

router.post('/', app.create, redirectAppShow);
router.post('/:id', app.addApp, redirectAppShow);

router.post('/:id/register', app.addApp, redirectShow);
router.delete('/:id/register', app.removeAppfromUser, redirectShow);

function renderIndex(req, res){
    var isAdmin = false;
    if (req.session.user){
        if (req.session.user.type == 'admin'){
            isAdmin = true;
        }
        var mustacheVariables = {
            apps: res.locals.apps,
            isAdmin: isAdmin
        }
    }
    res.render('./app/index',mustacheVariables);
}

function renderShow(req, res){
    var mustacheVariables;
    if (req.session.user){
        mustacheVariables = {
             app: res.locals.app,
             isFavorite: res.locals.isFavorite,
             user: req.session.user 
         }
    } else {
        mustacheVariables = {
            movie: res.locals.movie,
            user: req.session.user 
        }
    }
    res.render('./app/show',mustacheVariables);
}

function renderNew(req, res){
    res.render('./app/new');
}

function redirectShow(req, res){
    res.redirect(`/apps/${res.locals.app_id}`);
}

function redirectAppShow(req, res){
    res.redirect(`/apps`);
}

module.exports = router;