const SeminarHallBookingInterval = require("../model/SeminarHallBookingModel");
const BookingHistory = require('../model/BookingHistoryModel');

// Update the status of a seminar hall booking interval by the admin
const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Validate the input data here if needed
    // For example, check if the required fields are present

    const updatedBookingInterval = await SeminarHallBookingInterval.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated booking interval
    );

    // Create a new entry in the BookingHistory model
    const bookingHistory = new BookingHistory({
      bookingId: updatedBookingInterval._id,
      status,
      approvalDate: new Date(),
    });

    await bookingHistory.save();
    res.json(updatedBookingInterval);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update seminar hall booking interval status.', errorMessage: error.message });
  }
};

module.exports = {
  updateBookingStatus,
};
