const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // Add additional validation for email format if desired
  },
  // Add more fields as needed for member details
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
