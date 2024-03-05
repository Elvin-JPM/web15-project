var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require ('./lib/connectMongoose');

const LoginController = require('./controllers/LoginController');
const SignUpController = require('./controllers/SignUpController');
const ListProductsController = require('./controllers/ListProductsController');
const CreateProductController = require('./controllers/CreateProductController');
const ProductDetailController = require('./controllers/ProductDetailController');
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const loginController = new LoginController();
const signUpController = new SignUpController();
const listProductsController = new ListProductsController();
const createProductController = new CreateProductController();
const productDetailController = new ProductDetailController();


// API routes
app.post('/api/authenticate',loginController.postJWT);
app.post('/api/signup',signUpController.signUpUser);
app.get('/api/products',listProductsController.listProducts)
app.post('/api/products',jwtAuthMiddleware,createProductController.createProduct)
app.get('/api/products/:id/:name',productDetailController.getProductDetail);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
