const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser"); 
const dbConnect = require("./db/dbConnect");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//call the dbConnect function
dbConnect();

//Routes
app.use("/api/users", userRoutes);

module.exports = app;
