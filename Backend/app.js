const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cors = require("cors");

require("./lib/connectMongoose");

const LoginController = require("./controllers/LoginController");
const SignUpController = require("./controllers/SignUpController");
const ListProductsController = require("./controllers/ListProductsController");
<<<<<<< HEAD
=======
const ListProductsControllerrAuth = require("./controllers/ListProductsControllerAuth");
>>>>>>> 0f3cbb4 (Changing node:readline por readline)
const ProductsByOwnerPublicController = require("./controllers/ProductsByOwnerPublicController");
const CreateProductController = require("./controllers/CreateProductController");
const ProductDetailController = require("./controllers/ProductDetailController");
const ProductsByOwnerController = require("./controllers/ProductsByOwnerController");
const DeleteProductController = require("./controllers/DeleteProductController");
const EditProductController = require("./controllers/EditProductController");
const UnsuscribeUserController = require("./controllers/UnsuscribeUser");
<<<<<<< HEAD
=======

>>>>>>> 0f3cbb4 (Changing node:readline por readline)
const jwtAuthMiddleware = require("./lib/jwtAuthMiddleware");

const app = express();

// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const loginController = new LoginController();
const signUpController = new SignUpController();
const listProductsController = new ListProductsController();
<<<<<<< HEAD
=======
const listProductsControllerrAuth = new ListProductsControllerrAuth();
>>>>>>> 0f3cbb4 (Changing node:readline por readline)
const productsByOwnerPublicController = new ProductsByOwnerPublicController();
const productsByOwnerController = new ProductsByOwnerController();
const createProductController = new CreateProductController();
const productDetailController = new ProductDetailController();
const deleteProductController = new DeleteProductController();
const editProductController = new EditProductController();
<<<<<<< HEAD
const unsuscribeUserController = new UnsuscribeUserController();
=======
>>>>>>> 0f3cbb4 (Changing node:readline por readline)

// API routes
app.post("/api/authenticate", loginController.postJWT);

app.post("/api/signup", signUpController.signUpUser);

app.get("/api/products", listProductsController.listProducts);

<<<<<<< HEAD
=======
app.get(
  "/api/products/auth",
  jwtAuthMiddleware,
  listProductsControllerrAuth.listProductsAuth
);

const unsuscribeUserController = new UnsuscribeUserController();

// API routes
app.post("/api/authenticate", loginController.postJWT);

app.post("/api/signup", signUpController.signUpUser);

>>>>>>> 0f3cbb4 (Changing node:readline por readline)
app.get("/api/products", listProductsController.listProducts);

app.get(
  "/api/products/list/:owner",
  productsByOwnerPublicController.listProductsPublic
);

app.post(
  "/api/products",
  jwtAuthMiddleware,
  createProductController.createProduct
);

app.get(
  "/api/products/:owner",
  jwtAuthMiddleware,
  productsByOwnerController.listProducts
);

app.delete(
  "/api/products/:owner/:id",
  jwtAuthMiddleware,
  deleteProductController.deleteProduct
);

app.put(
  "/api/products/:owner/:id",
  jwtAuthMiddleware,
  editProductController.editProduct
);

app.get("/api/products/:id/:name", productDetailController.getProductDetail);
<<<<<<< HEAD
=======

app.get("/api/products/:id/:name", productDetailController.getProductDetail);
>>>>>>> 0f3cbb4 (Changing node:readline por readline)

app.delete(
  "/api/:username",
  jwtAuthMiddleware,
  unsuscribeUserController.unsuscribe
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
