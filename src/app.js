const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const router = require("./router.js")

const app = express();

app.use(router)
app.use(cors());
app.use(cookieParser());

module.exports = app