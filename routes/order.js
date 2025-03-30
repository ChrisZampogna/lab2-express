const express = require('express');
const Order = require(`../models/order`);
const router = express.Router();

/**
* @swagger
* components:
*   schemas:
*     order:
*       type: object
*       required:
*         - ProductID
*         - CustomerID
*       properties:
*         ProductID:
*           type: string
*           description: The unique ID of a product
*         CustomerID:
*           type: string
*           description: The unique ID of a customer
*/

/**
* @swagger
* /order:
*   post:
*     summary: Place a new order
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/order'
*     responses:
*       201:
*         description: Order placed
*       400:
*         description: Failed to place order
*/
router.post('/', async (req, res) => {
  try {
    // Function simulates processing the order
    // (waits 5 seconds)
    async function processOrder() {
      return new Promise(resolve => setTimeout(resolve, 5000))
    }
    const newEntity = await Order.create(req.body);
    await processOrder();
    res.status(201).json({
      "status": "success",
      "data": {
        "_id": newEntity._id
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
* /order/{id}:
*   delete:
*     summary: Delete an existing order
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: A unique order ID
*         example: "67d76f322943ae70098659b4"
*     responses:
*       200:
*         description: Order deleted
*       400:
*         description: Failed to delete order
*/
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
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
