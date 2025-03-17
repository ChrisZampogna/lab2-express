const express = require('express');
const generateCRUD = require("../util/generateCRUD");
const router = express.Router();

generateCRUD(router, "product");

module.exports = router;
