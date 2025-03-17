const express = require('express');
const router = express.Router();
const Customer = require(`../models/customer`);

   /**
    * @swagger
    * /customer:
    *   post:
    *     summary: Create a new customer
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           example:
    *             Name: John,
    *             MiddleName: B,
    *             LastName: Smith,
    *             Suffix: Sr,
    *             Username: JohnSmith3,
    *             Password: Password1
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
    * /customer:
    *   get:
    *     summary: Get a list of all customers
    *     requestBody:
    *       required: false
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
    * /customer:
    *   get:
    *     summary: Get a customer by ID
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           example:
    *             Id: John,
    *             MiddleName: B,
    *             LastName: Smith,
    *             Suffix: Sr,
    *             Username: JohnSmith3,
    *             Password: Password1
    */
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


// Update route (patch)
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

// Delete route (delete)
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
