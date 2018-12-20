// require all the libraries we need for the app:
var express = require('express');
var mustache = require('mustache-express');
var port = process.env.PORT || 3000;
var logger = require('morgan');  // makes pretty console logs
var bodyParser = require('body-parser');  // lets us attach data to the request
var methodOverride = require('method-override'); // lets us make forms that edit and delete
const apod = require('apod-nasa');

var movieController = require('./controllers/movie_controller');
var appController = require('./controllers/app_controller');

var app = express();

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride('_method'));

// express session 
var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

var profileController = require('./controllers/profile_controller');
var sessionsController = require('./controllers/session_controller');
var signupController = require('./controllers/signup_controller');
var newsController = require('./controllers/news_controller');

app.use('/signin', sessionsController);

app.use('/signup', signupController);

app.use('/profile', profileController);

app.use('/news', newsController);

app.use('/movies', movieController);

app.use('/apps', appController);

app.get('/', function(req, res){
    var mustacheVariables ={
        user: req.session.user
    };
    apod().then(data => {
        console.log(data);
          /*
            {
              title: 'The Summer Triangle over the Great Wall',
              image: 'https://apod.nasa.gov/apod/image/1707/GreatWallMilkyWay_Yu_1686.jpg'
            }
          */
         mustacheVariables.image = data.image;
         mustacheVariables.title = data.title;
         res.render('./index',mustacheVariables);
        });
})
  
app.listen(port, function(){
    console.log(`${port} it is running`);
})