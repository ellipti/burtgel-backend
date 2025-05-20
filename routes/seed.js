// seed.js
const mongoose = require('mongoose');
const User = require('./models/User'); // таны хэрэглэгчийн model зам
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await User.create({
    name: 'Админ',
    username: 'admin',
    password: '1234',
    role: 'admin'
  });
  console.log('✅ Админ хэрэглэгч нэмэгдлээ');
  process.exit();
}).catch(err => {
  console.error('❌ Алдаа:', err);
});
