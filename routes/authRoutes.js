const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const uname = username.toLowerCase(); // ✅ normalize username
    console.log('📩 Ирсэн хэрэглэгчийн нэр:', uname);

    const user = await User.findOne({ username: uname });

    if (!user) {
      console.log('❌ Хэрэглэгч олдсонгүй:', uname);
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    console.log('✅ Олдсон хэрэглэгч:', user.username, '| Role:', user.role);

    if (user.role === 'player') {
      return res.status(403).json({ message: 'Тоглогч нэвтрэх эрхгүй' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Нууц үг буруу' });
    }

    return res.status(200).json({
      name: user.name,
      username: user.username,
      role: user.role
    });

  } catch (err) {
    console.error('💥 Серверийн алдаа:', err.message);
    res.status(500).json({ message: 'Дотоод серверийн алдаа' });
  }
});

module.exports = router;
