var db = require('../db/dbconfig');
var movie = {};


movie.getAll = function(req,res, next){
    db.manyOrNone("SELECT * FROM movies;")
    .then(function(result){
        res.locals.movies = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

movie.find = function(req, res, next){
    db.oneOrNone("SELECT * FROM movies WHERE id=$1;",
    [req.params.id])
    .then(function(result){
        res.locals.movie = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

movie.create = function(req, res, next){
    var movieData = {
        name: req.body.name,
        description: req.body.description,
        rate: req.body.rate,
        years: req.body.languages,
        main_cast: req.body.app_url,
        imdb_url: req.body.imdb_url,
        trailer:  req.body.trailer,
        poster_img: req.body.poster_img
    }
    db.one("INSERT INTO movies(name, description, rate, years, main_cast, imdb_url, trailer, poster_img) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id;",
    [movieData.name, movieData.description, movieData.rate, movieData.years, movieData.main_cast, movieData.imdb_url, movieData.trailer, movieData.poster_img])
    .then(function(result){
        res.locals.movie_id = result.id;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

movie.update = function(req, res, next){
    var movieData = {
        name: req.body.name,
        description: req.body.description,
        rate: req.body.rate,
        years: req.body.languages,
        main_cast: req.body.app_url,
        imdb_url: req.body.imdb_url,
        trailer:  req.body.trailer,
        poster_img: req.body.poster_img
    }
    db.none("UPDATE movies SET name=$1, description=$2, rate=$3, years=$4, main_cast=$5, imdb_url=$6, trailer=$7, poster_img=$8  WHERE id=$9 RETURNING id;",
    [movieData.name, movieData.description, movieData.rate, movieData.years, movieData.main_cast, movieData.imdb_url, movieData.trailer, movieData.poster_img ,req.params.id])
    .then(function(result){
        res.locals.movie_id = result.id;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

movie.delete = function(req, res, next){
    db.none("DELETE FROM movies WHERE id=$1;",
    [req.params.id])
    .then(function(){
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
} 

movie.addMovie = function(req, res, next){
    db.one("INSERT INTO favoriteMovie(movie_id, user_id) VALUES($1,$2) RETURNING movie_id;",
    [req.params.id, req.session.user.id])
    .then(function(result){
        console.log("INNNNSERT MMMMo", result);
        res.locals.movie_id = result.movie_id;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

movie.removeMoviefromUser = function(req, res, next){
    db.one("DELETE FROM favoriteMovie WHERE movie_id=$1 AND user_id=$2 RETURNING movie_id;", [req.session.user.id, req.params.id])
    .then(function(result){
      res.locals.movie_id = result.movie_id;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

movie.findByUser = function(req, res, next){
    if (req.session.user){
        db.manyOrNone("SELECT * FROM favoriteMovie WHERE user_id = $1 AND movie_id=$2;", [req.session.user.id, req.params.id])
          .then(function(result){
            if (result.length > 0) {
              res.locals.isFavorite = true;
            } else {
              res.locals.isFavorite = false;
            }
            next();
          })
          .catch(function(error){
            console.log(error);
            next();
          })
    } else {
        next();
    }
  }

module.exports = movie;