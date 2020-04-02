const express = require("express");
const morgan = require("morgan");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

const todosRoute = require("./routes/todosRoute.js");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(cors({ origin: "https://luca-fuligni.github.io" }));
app.options('*', cors());

//Set security header
app.use(helmet());

// Set IP rate limit
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!"
});
app.use("/api", limiter);

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//Parse data in Json
app.use(express.json({ limit: "10kb" }));

//Data sanitization against NoSqlInjection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(
  hpp({
    whitelist: ["duration", "priority", "tag"]
  })
);

//ROUTES
app.use("/api/v1/todos", todosRoute);

//Don't find route, return 404
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//ERROR HANDLING
app.use(globalErrorHandler);
module.exports = app;
