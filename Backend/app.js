const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cors = require("cors");
const cron = require("node-cron");

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
const SendRecommendedProductsEmailController = require("./controllers/EmailRecommendedSender");
const GetAllChatsController = require("./controllers/GetAllChatsController");
const FindOrCreateChatController = require("./controllers/FindOrCreateChatController");
const InsertChatMessageController = require("./controllers/InsertChatMessageController");
const CreateNewMessageNotification = require("./controllers/CreateNewMessageNotification");
const FindUserNotifications = require("./controllers/FindUserNotifications");
const MarkReadMessageController = require("./controllers/MarkReadMessageController");
const jwtAuthMiddleware = require("./lib/jwtAuthMiddleware");

const http = require("http");
const { configureSocket } = require("./lib/socket_IOServer");

const app = express();

// Create a Socket.IO server using an http server
const server = http.createServer(app);
const io = configureSocket(server);
global.io = io;

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
    maxAge: 3600, // Value is in seconds
  })
);

// Initialazing Socket.IO Server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor de SocketIO corriendo en el puerto ${PORT}`);
});

// view engine setup

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
const sendRecommendedProductsEmail =
  new SendRecommendedProductsEmailController();
const getAllChatsController = new GetAllChatsController();
const findOrCreateChatController = new FindOrCreateChatController();
const insertChatMessageController = new InsertChatMessageController();
const createNewMessageNotification = new CreateNewMessageNotification();
const findUserNotifications = new FindUserNotifications();
const markReadMessageController = new MarkReadMessageController();
// Send emails of recommended products
cron.schedule(
  "0 9 * * 1,4",
  () => {
    sendRecommendedProductsEmail.send();
  },
  {
    scheduled: true,
    timezone: "America/New_York", // Ajusta la zona horaria según tu ubicación
  }
);

// API routes
app.post("/api/authenticate", loginController.postJWT);

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

app.get(
  "/api/get-chats/:owner/:productId",
  jwtAuthMiddleware,
  getAllChatsController.getProductChats
);

app.post(
  "/api/find-create-chat",
  jwtAuthMiddleware,
  findOrCreateChatController.findOrCreateChat
);

app.put(
  "/api/chat/:chatId",
  jwtAuthMiddleware,
  insertChatMessageController.insertChatMessage
);

app.post("/api/notifications", createNewMessageNotification.createNotification);
app.get(
  "/api/notifications/:recipient",
  findUserNotifications.findNotifications
);

app.put(
  "/api/notifications/:notificationId",
  jwtAuthMiddleware,
  markReadMessageController.markMessage
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
