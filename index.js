require("dotenv").config();
const express = require("express");
const app = express();
const dbConnection = require("./config/dbConnection");
const cors = require("cors");
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
dbConnection();
app.use(routes);

app.listen(5001);
