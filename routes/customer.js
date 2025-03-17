const express = require('express');
const router = express.Router();
const Customer = require(`../models/customer`);

// Create route (post)
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

// Read route (get) (All)
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

// Read route (get) (by ID)
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
