const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const seminarHallBookingIntervalSchema = new Schema({
  seminarHall: {
    type: Schema.Types.ObjectId,
    ref: 'Hall', // Reference to the SeminarHall model
    required: true,
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member', // Reference to the Member model
    required: true,
  },
  // department: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Department', // Reference to the Department model
  //   required: true,
  // },
  bookingDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },

  


  // Add more fields as needed for the booking interval details
});

const SeminarHallBookingInterval = mongoose.model('SeminarHallBookingInterval', seminarHallBookingIntervalSchema);

module.exports = SeminarHallBookingInterval;
