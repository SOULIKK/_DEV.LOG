'user strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Article = require('./article');


const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

const db = {};
db.sequelize = sequelize;

db.User = User;
db.Article = Article;

User.init(sequelize);
Article.init(sequelize);

User.associate(db);
Article.associate(db);

module.exports = db;