var express = require('express');
var router = express.Router();
var session = require('../models/session');

router.get('/', renderNew);
router.post('/', session.create, redirectShow);
router.delete('/', session.delete, redirectLogin);

function renderNew(req, res){
  console.log(req.session.user);
  res.render('./signin/index');
}

function redirectShow(req, res){
  if(req.session.user){
    res.redirect(`/`);
  }else{
    res.redirect('/signin');
  }
}

function redirectLogin(req, res){
  res.redirect('/');
}

module.exports = router;