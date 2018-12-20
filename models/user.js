var bcrypt = require('bcrypt');
var db = require('../db/dbconfig');
var user = {};

user.create = function(req, res, next){
    db.one("INSERT INTO users (name, email, password, type) VALUES($1, $2, $3, 'admin') RETURNING *;",
          [req.body.name, req.body.email.toLowerCase(), bcrypt.hashSync(req.body.password, 10)])
      .then(function(result){
        req.session.user = result;
        res.locals.userId = result.id;
        next();
      })
      .catch(function(error){
        console.log(error);
        next();
      })
}  

user.find = function(req, res, next){
    db.oneOrNone("SELECT * FROM users WHERE id=$1;",
    [req.params.id])
    .then(function(result){
        res.locals.user= result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}


user.update = function(req, res, next){
    db.oneOrNone("UPDATE users SET name=$1 WHERE id=$2;",
    [req.body.name, req.params.id])
    .then(function(result){
        console.log(result);
        res.locals.user= result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

user.addApp = function(req, res, next){
    console.log("***********",req.params.id);
    db.one("INSERT INTO favoriteApp(app_id, user_id) VALUES($1,$2) RETURNING *;",
    [req.params.id, req.session.user.id])
    .then(function(result){
        console.log("INNNNSERT AAAApppp", result);
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

user.addMovie = function(req, res, next){
    db.one("INSERT INTO favoriteMovie(movie_id, user_id) VALUES($1,$2) RETURNING *;",
    [req.params.id, req.session.user.id])
    .then(function(result){
        console.log("INNNNSERT MMMMo", result);
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

user.getMovieByuser = function(req, res, next){
    db.manyOrNone("SELECT * FROM favoriteMovie, movies WHERE favoriteMovie.movie_id = movies.id AND favoriteMovie.user_id = $1;",
    [req.params.id])
    .then(function(result){
        // console.log("Moviiiiies",result);
        res.locals.favoriteMovie = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

user.getAppByuser = function(req, res, next){
    db.manyOrNone("SELECT * FROM favoriteApp, apps WHERE favoriteApp.app_id = apps.id AND favoriteApp.user_id = $1;",
    [req.params.id])
    .then(function(result){
        console.log("APPPPPS",result);
        res.locals.favoriteApp = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

module.exports = user;