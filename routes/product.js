const express = require('express');
const router = express.Router();
const Product = require(`../models/product`);

/**
* @swagger
* components:
*   schemas:
*     product:
*       type: object
*       required:
*         - Name
*         - Description
*         - SKU
*         - Price
*         - Weight
*         - Height
*         - Length
*       properties:
*         Name:
*           type: string
*           description: The name of the product
*         Description:
*           type: string
*           description: A description of the product
*         SKU:
*           type: string
*           description: Identifying code for the product
*         Price:
*           type: number
*           description: Unit price of the product
*         Weight:
*           type: number
*           description: Weight of the product in kg
*         Height:
*           type: number
*           description: Height of the product in cm
*         Length:
*           type: number
*           description: Length of the product in cm
*/


/**
* @swagger
* /product:
*   post:
*     summary: Create a new product
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/product'
*     responses:
*       201:
*         description: product created
*       400:
*         description: Failed to create product
*/
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      "status": "success",
      "data": {
        "_id": newProduct._id
      }
    });
  } catch (err) {
    res.status(400).json({
      "status": "failure",
      "data": {
        "error": err.message
      }
    });
  }
});

/**
* @swagger
* /product:
*   post:
*     summary: Get a list of all products
*     requestBody:
*       required: false
*     responses:
*       200:
*         description: Products returned
*       500:
*         description: Failed to return products
*/
router.get('/all', async (req, res) => {
  try {
    const items = await Product.find();
    res.json({
      "status": "success",
      "data": {
        items
      }
    });
  } catch (err) {
    res.status(500).json({
      "status": "failure",
      "data": {
        "error": err.message
      }
    });
  }
});

/**
* @swagger
* /product/{id}:
*   get:
*     summary: Retrieve a product by ID
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: A unique product ID
*         example: "67d76f322943ae70098659b4"
*     responses:
*       200:
*         description: Product retrieved
*       400:
*         description: Failed to retrieve product
*/
router.get('/:id', async (req, res) => {
  try {
    const items = await Product.findById(req.params.id);
    res.json({
      "status": "success",
      "data": {
        items
      }
    });
  } catch (err) {
    res.status(500).json({
      "status": "failure",
      "data": {
        "error": err.message
      }
    });
  }
});


/**
* @swagger
* /product/{id}:
*   patch:
*     summary: Update an existing product
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: A unique product ID
*         example: "67d76f322943ae70098659b4"
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/product'
*     responses:
*       200:
*         description: Product updated
*       400:
*         description: Failed to update product
*/
router.patch('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({
      "status": "success",
      "data": {
        updatedProduct
      }
    });
  } catch (err) {
    res.status(400).json({
      "status": "failure",
      "data": {
        "error": err.message
      }
    });
  }
});

/**
* @swagger
* /product/{id}:
*   delete:
*     summary: Delete an existing product
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: A unique product ID
*         example: "67d76f322943ae70098659b4"
*     responses:
*       200:
*         description: Product deleted
*       400:
*         description: Failed to delete product
*/
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ "status": "success" });
  } catch (err) {
    res.status(400).json({
      "status": "failure",
      "data": {
        "error": err.message
      }
    });
  }
});

module.exports = router;
