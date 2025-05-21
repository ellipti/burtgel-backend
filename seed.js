// seed.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('🔌 DB холбогдлоо, хэрэглэгч нэмэх гэж байна...');

    const existing = await User.findOne({ username: 'admin' });
    if (existing) {
      console.log('ℹ️ admin хэрэглэгч аль хэдийн байна.');
    } else {
      await User.create({
        name: 'Админ',
        username: 'admin',
        password: '1234',
        role: 'admin'
      });
      console.log('✅ admin хэрэглэгч амжилттай нэмэгдлээ!');
    }

    process.exit();
  })
  .catch(err => {
    console.error('❌ Алдаа:', err.message);
    process.exit(1);
  });
