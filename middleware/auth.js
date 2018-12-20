var auth = {};

auth.restrict = function(req, res, next){
  if(req.session.user){
    next();
  }else{
    res.redirect('/signin');
  }
}

auth.onlyUsers = function(req, res, next) {
  if (req.session.user) {
    if(req.params.id == req.session.user.id){
      next();
    }else{
      res.redirect(`/profile/${req.session.user.id}`)
    }
  } else {
    res.redirect('/signin');
  }
}

module.exports = auth;