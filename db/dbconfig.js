var pgPromise = require('pg-promise');
var pgInstance = pgPromise();

var config = {
  host: 'localhost',
  port: 5432,
  database: 'about_space_db',
  user: 'postgres',
  password: '200100'
}

var connection = pgInstance(process.env.DATABASE_URL || config);

module.exports = connection;