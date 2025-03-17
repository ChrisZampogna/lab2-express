const express = require('express');
const generateCRUD = require("../util/generateCRUD");
const router = express.Router();

generateCRUD(router, "customer");

module.exports = router;
