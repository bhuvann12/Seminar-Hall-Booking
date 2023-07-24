const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingHistorySchema = new Schema({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking', // Reference to the original Booking model
    required: true,
  },
  status: {
    type: String,
    enum: ['approved', 'rejected'],
    required: true,
  },
  approvalDate: {
    type: Date,
    required: true,
  },
  // Add more fields as needed for booking history details
});

const BookingHistory = mongoose.model('BookingHistory', bookingHistorySchema);

module.exports = BookingHistory;
