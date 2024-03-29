import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {customLogger} from "./middlewares/logger.middleware.js";
import {customCORS} from "./middlewares/cors.middleware.js";
import {errorHandler} from "./middlewares/error-handler.middleware.js";
import routes from "./routes/index.js";
import "./configs/passport.config.js";

dotenv.config({path: ".env"});
const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true}));
app.use(bodyParser.json());
app.use(customLogger);
app.use(customCORS);
app.use(cookieParser());

if (!isProduction) {
  app.use(errorHandler);
}

// deprecate **change later**
mongoose.set("strictQuery", true);

if (isProduction) {
  mongoose.connect(process.env.MONGO_URI);
} else {
  mongoose.connect("mongodb://localhost:27017/testDatabase2");
  mongoose.set("debug", true);
}

app.use("/", routes);

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log("Server running in", process.env.NODE_ENV, "mode on port", PORT)
);
