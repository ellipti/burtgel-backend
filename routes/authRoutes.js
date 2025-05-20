// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    if (user.role === 'player') {
      return res.status(403).json({ message: 'Тоглогч нэвтрэх эрхгүй' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Нууц үг буруу' });
    }

    return res.status(200).json({
      name: user.name,
      username: user.username,
      role: user.role,
    });

  } catch (err) {
    res.status(500).json({ message: 'Серверийн алдаа', error: err.message });
  }
});

module.exports = router;
