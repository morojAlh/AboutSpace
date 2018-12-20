var bcrypt = require('bcrypt');
var db = require('../db/dbconfig');

var session = {};

session.create = function(req, res, next){
  var email = req.body.email.toLowerCase();
  db.one("SELECT * FROM users WHERE email = $1;", [email])
    .then(function(result){
      if(bcrypt.compareSync(req.body.password, result.password)){
        // console.log("ADMMMMIN",result.type);
        req.session.user = result;
        // if (result.type == 'admin'){
        //   // res.locals.isAdmin = true;
        //   // console.log("ADMMMIN",res.locals.isAdmin);
        // } else {
        //   req.session.user = result;
        //   res.locals.isAdmin = false;
        // }
      }
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

session.delete = function(req, res, next){
  req.session.user = null;
  next();
}

module.exports = session;