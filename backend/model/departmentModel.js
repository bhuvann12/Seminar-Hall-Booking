const mongoose = require('mongoose');
const Member = require("../model/memberModel")

const Schema = mongoose.Schema
// Define the schema for the Department model
const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
    // Add additional validation for email format if desired
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Member', // Reference to the Member model
    },
  ],

  // Add more fields as needed for your department details
});

// Create the Department model based on the schema
const Department = mongoose.model('Department', departmentSchema);

// Export the Department model
module.exports = Department;
