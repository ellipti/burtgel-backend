const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST - хэрэглэгч нэмэх
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;
    const newUser = new User({ name, email, phone, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - role-оор шүүх боломжтой
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;

    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
