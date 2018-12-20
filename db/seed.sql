DROP DATABASE IF EXISTS about_space_db;
CREATE DATABASE about_space_db;

\c about_space_db 

CREATE TABLE users(
  id serial PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR not null,
  type VARCHAR
);

-- INSERT INTO users(name,email,password) VALUES('Moroj', 'moroj.alh@gmail.com','123456');

CREATE TABLE apps(
  id serial PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  rate int,
  languages VARCHAR,
  app_url VARCHAR
);

INSERT INTO apps(name, description, rate, languages, app_url) VALUES
('Night Sky',
'Night Sky is a powerful AR personal planetarium. Quickly identify stars, planets, constellations and satellites above by simply holding your iPhone, iPad or Apple Watch to the Night Sky!  This is all done magically.  Whether you’re looking for a constellation or the International Space Station, let Night Sky direct you to it, then explore the object in AR!',
0,
'Engilsh',
'https://itunes.apple.com/us/app/night-sky/id475772902?mt=8'),
('Star Walk 2 - Night Sky Map',
'Star Walk 2 is an exquisite stargazing app enabling you to explore the night sky through the screen of your device. Make an effortless journey through thousands of stars, comets, constellations, and other celestial bodies. All you have to do is point your device to the sky!',
4.7,
'Engilsh',
'https://itunes.apple.com/us/app/star-walk-2-night-sky-map/id892279069?mt=8'),
('star chart',
'*** Star Chart is now FREE! *** The top educational & augmented reality astronomy app - download and find out why over 20 million people use Star Chart!
You can now have a virtual star chart in your pocket. Look through the eyes of your iPhone or iPad* to see a high-tech window into the whole visible universe.
All you have to do is point your AR enabled device* at the sky and Star Chart will tell you exactly what you are looking at.
Using state of the art GPS technology, an accurate 3D simulation of the visible universe, and a great deal of technical wizardry, Star Chart calculates – in real time - the current location of every star, planet and moon visible from Earth and shows you precisely where they are; even in broad daylight!',
4.6,
'English',
'https://itunes.apple.com/us/app/star-chart/id345542655?mt=8')
;

CREATE TABLE movies(
  id serial PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  rate int,
  years VARCHAR,
  main_cast VARCHAR,
  imdb_url VARCHAR,
  trailer VARCHAR,
  poster_img VARCHAR
);

INSERT INTO movies(name, description, rate, years, main_cast, imdb_url, trailer, poster_img) VALUES
('Interstellar',
'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival',
8.6,
'2014',
'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
'https://www.imdb.com/title/tt0816692/',
'https://www.youtube.com/watch?v=zSWdZVtXT7E',
'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX675_AL_.jpg'
),
('The Martian',
'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.',
8.0,
'2015',
'Matt Damon, Jessica Chastain, Kristen Wiig',
'https://www.imdb.com/title/tt3659388/?ref_=nv_sr_1',
'https://www.youtube.com/watch?v=Ue4PCI0NamI',
'https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SY1000_CR0,0,675,1000_AL_.jpg'
);

CREATE TABLE favoriteMovie(
  id serial PRIMARY KEY,
  movie_id int not null,
  user_id int not null,
  foreign key(user_id) references users,
  foreign key(movie_id) references movies
  );

--   INSERT INTO favoriteMovie(movie_id, user_id) VALUES(1,1);

  CREATE TABLE favoriteApp(
  id serial PRIMARY KEY,
  app_id int not null,
  user_id int not null,
  foreign key(user_id) references users,
  foreign key(app_id) references apps
  );
  
--   INSERT INTO favoriteApp(app_id, user_id) VALUES(2,1);