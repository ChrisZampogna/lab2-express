const express = require('express');
const Order = require(`../models/order`);
const router = express.Router();

// Place order
router.post('/', async (req, res) => {
  try {
    // Function simulates processing the order
    // (waits 5 seconds)
    async function processOrder() {
      return new Promise(resolve => setTimeout(resolve, 5000))
    }
    const newEntity = await Entity.create(req.body);
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

// Cancel order
router.delete('/:id', async (req, res) => {
  try {
    await Entity.findByIdAndDelete(req.params.id);
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
