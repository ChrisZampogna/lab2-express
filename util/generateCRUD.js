const generateCRUD = function (router, modelName) {
  const express = require('express');
  const Entity = require(`../models/${modelName}`);

  // Create route (post)
  router.post('/', async (req, res) => {
    try {
      console.log(req.body);
      const newEntity = await Entity.create(req.body);
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

  // Read route (get) (All)
  router.get('/all', async (req, res) => {
    try {
      const items = await Entity.find();
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
      const items = await Entity.findById(req.params.id);
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
      const updatedEntity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({
        "status": "success",
        "data": {
          updatedEntity
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
}

module.exports = generateCRUD;
