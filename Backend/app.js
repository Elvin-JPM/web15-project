const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cors = require("cors");
<<<<<<< HEAD
const cron = require('node-cron');
=======
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08

require("./lib/connectMongoose");

const LoginController = require("./controllers/LoginController");
const SignUpController = require("./controllers/SignUpController");
const ListProductsController = require("./controllers/ListProductsController");
const ProductsByOwnerPublicController = require("./controllers/ProductsByOwnerPublicController");
const CreateProductController = require("./controllers/CreateProductController");
const ProductDetailController = require("./controllers/ProductDetailController");
const ProductsByOwnerController = require("./controllers/ProductsByOwnerController");
const DeleteProductController = require("./controllers/DeleteProductController");
const EditProductController = require("./controllers/EditProductController");
const UnsuscribeUserController = require("./controllers/UnsuscribeUser");
const ProductFavsController = require("./controllers/ProductFavsController");
const ProductsFavsListController = require("./controllers/ProductsFavsListController");
const UpdateUserController = require("./controllers/UpdateUserController");
const ReturnImageController = require("./controllers/ReturnImageController");
const ResetUserController = require("./controllers/ResetUserController");
const ProductReservedController = require("./controllers/ProductReservedController");
const ProductSoldController = require("./controllers/ProductSoldController");
const GetUserController = require("./controllers/GetUserController");
const DeleteUserController = require("./controllers/DeleteUserController");
<<<<<<< HEAD
const SendRecommendedProductsEmailController = require("./controllers/EmailRecommendedSender");
const jwtAuthMiddleware = require("./lib/jwtAuthMiddleware");


=======
const jwtAuthMiddleware = require("./lib/jwtAuthMiddleware");

>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
const http = require("http");
const { configureSocket } = require("./lib/socket_IOServer");

const app = express();

// Create a Socket.IO server using an http server
const server = http.createServer(app);
const io = configureSocket(server);
global.io = io;

// Initialazing Socket.IO Server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor de SocketIO corriendo en el puerto ${PORT}`);
});

// view engine setup
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Cache-Control",
      "X-Requested-With",
      "User-Agent",
      "Origin",
      "X-CSRF-Token",
      "headers",
    ],
    credentials: true,
  })
);
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
const productsByOwnerPublicController = new ProductsByOwnerPublicController();
const productsByOwnerController = new ProductsByOwnerController();
const createProductController = new CreateProductController();
const productDetailController = new ProductDetailController();
const deleteProductController = new DeleteProductController();
const editProductController = new EditProductController();
const unsuscribeUserController = new UnsuscribeUserController();
const productFavsController = new ProductFavsController();
const productsFavsListController = new ProductsFavsListController();
const productReservedController = new ProductReservedController();
const updateUserController = new UpdateUserController();
const returnImageController = new ReturnImageController();
const resetUserController = new ResetUserController();
const productSoldController = new ProductSoldController();
const getUserController = new GetUserController();
const deleteUserController = new DeleteUserController();
<<<<<<< HEAD
const sendRecommendedProductsEmail = new SendRecommendedProductsEmailController();

// Send emails of recommended products
cron.schedule('0 9 * * 1,4', () => {
  sendRecommendedProductsEmail.send();
}, {
  scheduled: true,
  timezone: 'America/New_York' // Ajusta la zona horaria según tu ubicación
});

// API routes
app.post(
  "/api/authenticate", loginController.postJWT);
=======

// API routes
app.post("/api/authenticate", loginController.postJWT);
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08

app.put("/api/reset-password", resetUserController.resetPassword);

app.put("/api/updateuser", resetUserController.sendResetEmail);

app.post("/api/reset-password", resetUserController.sendResetEmail);

app.post("/api/authenticate", loginController.postJWT);

app.post("/api/signup", signUpController.signUpUser);

app.put(
  "/api/updateuser/:username",
  jwtAuthMiddleware,
  updateUserController.updateUserInfo
);

app.post("/api/reset-password", resetUserController.sendResetEmail);

app.put("/api/reset-password", resetUserController.resetPassword);

app.delete(
  "/api/:username",
  jwtAuthMiddleware,
  unsuscribeUserController.unsuscribe
);

app.put(
  "/api/:username",
  jwtAuthMiddleware,
  updateUserController.updateUserInfo
);

app.put(
  "/api/products/check-reserved/:id",
  jwtAuthMiddleware,
  productReservedController.checkReservedProduct
);

app.put(
  "/api/products/uncheck-reserved/:id",
  jwtAuthMiddleware,
  productReservedController.uncheckReservedProduct
);

app.put(
  "/api/products/check-sold/:id",
  jwtAuthMiddleware,
  productSoldController.checkSoldProduct
);

app.put(
  "/api/products/uncheck-sold/:id",
  jwtAuthMiddleware,
  productSoldController.uncheckSoldProduct
);

app.get("/api/products", listProductsController.listProducts);

app.get("/api/images/:imageName", returnImageController.returnImage);

app.get(
  "/api/products/list/:owner",
  productsByOwnerPublicController.listProductsPublic
);

app.get(
  "/api/products/:owner",
  jwtAuthMiddleware,
  productsByOwnerController.listProducts
);

app.post(
  "/api/products",
  jwtAuthMiddleware,
  createProductController.createProduct
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

app.put(
  "/api/products/:id",
  jwtAuthMiddleware,
  productFavsController.checkFavouriteProduct
);

app.delete(
  "/api/products/:id",
  jwtAuthMiddleware,
  productFavsController.uncheckFavouriteProduct
);

app.get(
  "/api/:owner/favs",
  jwtAuthMiddleware,
  productsFavsListController.listFavouriteProducts
);

app.get("/api/get/:username", jwtAuthMiddleware, getUserController.getUserData);

app.delete(
  "/api/deleteUser/:username",
  jwtAuthMiddleware,
  deleteUserController.deleteUser
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
