const generateCRUD = function (router, modelName) {
  const express = require('express');
  const Entity = require(`../models/${modelName}`);

  // Create route (post)
  router.post('/', async (req, res) => {
    try {
      console.log(req.body);
      const newEntity = await Entity.create(req.body);
      res.status(201).json(newEntity);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Read route (get)
  router.get('/', async (req, res) => {
    try {
      const items = await Entity.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Update route (patch)
  router.patch('/:id', async (req, res) => {
    try {
      const updatedEntity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedEntity);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Delete route (delete)
  router.delete('/:id', async (req, res) => {
    try {
      await Entity.findByIdAndDelete(req.params.id);
      res.json({ message: 'Entity deleted' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
}

module.exports = generateCRUD;
