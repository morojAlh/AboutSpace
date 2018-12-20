var db = require('../db/dbconfig');
var app = {};


app.getAll = function(req, res, next){
    db.manyOrNone("SELECT * FROM apps;")
    .then(function(result){
        res.locals.apps = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

app.find = function(req, res ,next){
    db.oneOrNone("SELECT * FROM apps WHERE id=$1;",
    [req.params.id])
    .then(function(result){
        res.locals.app = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

app.create = function(req, res, next){
    var appData = {
        name: req.body.name,
        description: req.body.description,
        rate: req.body.rate,
        languages: req.body.languages,
        app_url: req.body.app_url
    }
    db.one("INSERT INTO apps(name, description, rate, languages, app_url) VALUES($1,$2,$3,$4,$5) RETURNING id;",
    [appData.name, appData.description, appData.rate, appData.languages, appData.app_url])
    .then(function(result){
        res.locals.app_id = result.id;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

app.update = function(req, res, next){
    var appData = {
        name: req.body.name,
        description: req.body.description,
        rate: req.body.rate,
        languages: req.body.languages,
        app_url: req.body.app_url
    }
    db.none("UPDATE apps SET name=$1, description=$2, rate=$3, languages=$4, app_url=$5 WHERE id=$6 RETURNING id;",
    [appData.name, appData.description, appData.rate, appData.languages, appData.app_url ,req.params.id])
    .then(function(result){
        res.locals.app_id = result.id;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

app.delete = function(req, res, next){
    db.none("DELETE FROM apps WHERE id=$1;",
    [req.params.id])
    .then(function(){
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}


app.addApp = function(req, res, next){
    console.log("***********",req.params.id);
    db.one("INSERT INTO favoriteApp(app_id, user_id) VALUES($1,$2) RETURNING *;",
    [req.params.id, req.session.user.id])
    .then(function(result){
        res.locals.app_id = result.app_id;
        console.log("INNNNSERT AAAApppp", result);
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

app.removeAppfromUser = function(req, res, next){
    db.one("DELETE FROM favoriteApp WHERE app_id=$1 AND user_id=$2 RETURNING app_id;", [req.params.id,req.session.user.id])
    .then(function(result){
      res.locals.app_id = result.app_id;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

app.findByUser = function(req, res, next){
    if (req.session.user){
    db.manyOrNone("SELECT * FROM favoriteApp WHERE user_id = $1 AND app_id=$2;", [req.session.user.id, req.params.id])
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

module.exports = app;