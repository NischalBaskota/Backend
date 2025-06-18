const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address:  { type: String, required: true },
  phone:    String,
}, { timestamps: true });

module.exports = mongoose.model('Parent', parentSchema);
