const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const MariaDB = require('./modules/webshop-mariadb');

const database = new MariaDB();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const user = await database.checkLogin(req);
  if (user) {
    req.user = user;
  }
  next();
});

app.use('/', require('./routes/index'));
app.use('/about', require('./routes/about'));
app.use('/api', require('./routes/api'));
app.use('/baskets', require('./routes/baskets'));
app.use('/contact', require('./routes/contact'));
app.use('/login', require('./routes/login'));
app.use('/myProfile', require('./routes//myProfile'));
app.use('/orders', require('./routes/orders'));
app.use('/privacy', require('./routes/privacyPolicy'));
app.use('/projects', require('./routes/projects'));
app.use('/register', require('./routes/register'));
app.use('/terms', require('./routes/termsAndConditions'));
app.use('/thankyou', require('./routes/thankyou'));
app.use('/users', require('./routes/users'));

// clear userID cookie when logging out
app.use('/logout', (req, res, next) => {
  res.clearCookie('userID');
  res.redirect('/');
});

app.use('/**', require('./routes/error-page'));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
