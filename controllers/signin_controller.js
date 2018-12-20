var express = require('express');
var router = express.Router();

var user = require('../models/user');
var session = require('../models/session');

router.get('/', renderIndex);

// router.post('/', render);
// router.post('/', session.create, redirectShow);
// router.get('/:id', auth.onlyUsers, user.find, renderShow);

function renderIndex(req, res){
    res.render('./signin/index');
}

// function redirectShow(req,res){
//     res.render();
// }

module.exports = router;