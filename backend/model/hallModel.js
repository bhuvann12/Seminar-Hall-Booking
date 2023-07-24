const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for the Seminar Hall model
const hallSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  facilities: {
    type: [String],
    default: [],
  },
  availability: {
    type: Boolean,
    default: true,
  },
  // Add more fields as needed for seminar hall details
});

// Create the Seminar Hall model based on the schema
const Hall = mongoose.model('Hall', hallSchema);

// Export the Hall model
module.exports = Hall;
