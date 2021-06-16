const express = require('express');
const pageRouter = require('./routes/page');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();

app.set('port', process.env.PORT || 8008);
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true
});

passportConfig();

app.use(morgan('dev'));



app.use('/', pageRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'Port Listening');
});