// express-server/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  description: String,
  reminder: Boolean
});

module.exports = mongoose.model('Event', eventSchema);
