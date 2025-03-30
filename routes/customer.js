const express = require('express');
const router = express.Router();
const Customer = require(`../models/customer`);

/**
* @swagger
* components:
*   schemas:
*     customer:
*       type: object
*       required:
*         - Name
*         - LastName
*         - Username
*         - Password
*       properties:
*         Name:
*           type: string
*           description: The customer's first name
*         MiddleName:
*           type: string
*           description: The customer's middle name
*         LastName:
*           type: string
*           description: The customer's last name
*         Suffix:
*           type: string
*           description: Name suffix, such as Jr. or Sr.
*         Username:
*           type: string
*           description: The customer's username for authentication
*         Password:
*           type: string
*           description: The customer's password for authentication
*/

/**
* @swagger
* /customer:
*   post:
*     summary: Create a new customer
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/customer'
*     responses:
*       201:
*         description: Customer created
*       400:
*         description: Failed to create customer
*/
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({
      "status": "success",
      "data": {
        "_id": newCustomer._id
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
* /customer/all:
*   get:
*     summary: Get a list of all customers
*     requestBody:
*       required: false
*     responses:
*       200:
*         description: Customers returned
*       500:
*         description: Failed to return customers
*/
router.get('/all', async (req, res) => {
  try {
    const items = await Customer.find();
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
* /customer/{id}:
*   get:
*     summary: Retrieve a customer by ID
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: A unique customer ID
*         example: "67d76f322943ae70098659b4"
*     responses:
*       200:
*         description: Customer retrieved
*       400:
*         description: Failed to retrieve customer
*/
router.get('/:id', async (req, res) => {
  try {
    const items = await Customer.findById(req.params.id);
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
* /customer/{id}:
*   patch:
*     summary: Update an existing customer
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: A unique customer ID
*         example: "67d76f322943ae70098659b4"
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/customer'
*     responses:
*       200:
*         description: Customer updated
*       400:
*         description: Failed to update customer
*/
router.patch('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({
      "status": "success",
      "data": {
        updatedCustomer
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
* /customer/{id}:
*   delete:
*     summary: Delete an existing customer
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: A unique customer ID
*         example: "67d76f322943ae70098659b4"
*     responses:
*       200:
*         description: Customer deleted
*       400:
*         description: Failed to delete customer
*/
router.delete('/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
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
