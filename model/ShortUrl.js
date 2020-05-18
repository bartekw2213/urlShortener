const mongoose = require('mongoose');

const ShortUrlSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('short_url', ShortUrlSchema);
