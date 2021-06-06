const express = require('express');
const pageRouter = require('./routes/page');
const nunjucks = require('nunjucks');

const app = express();

app.set('port', process.env.PORT || 8008);
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true
})

app.use('/', pageRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'Port Listening');
});