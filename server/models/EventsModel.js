const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isAllDay: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
