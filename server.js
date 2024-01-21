const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

const connectDB = require("./db");
const router = require("./appRouter");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const port = process.env.PORT || 5001;

// to enable cross-origin restrictions
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// connecting to DB
connectDB();

// routes
app.use(router);
app.use("/user", userRouter);
//error Handler
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
