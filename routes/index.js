const express = require("express");
const _ = express.Router();
const apiRoutes = require("./api");

const api = process.env.BASE_URL;

_.use(api, apiRoutes);
_.use((req, res) => res.json("No Api found in this route"));

module.exports = _;
