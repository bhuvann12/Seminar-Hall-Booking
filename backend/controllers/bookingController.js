const SeminarHallBookingInterval = require("../model/SeminarHallBookingModel");
const Hall = require("../model/hallModel")
const Member = require('../model/memberModel');
// Create a new seminar hall booking interval
const createBookingInterval = async (req, res) => {
  const { seminarHall, member, bookingDate, startTime, endTime } = req.body;
  console.log(seminarHall, member, bookingDate, startTime, endTime)
  try {
    // Validate the input data here if needed
    // For example, check if the required fields are present

    const newBookingInterval = new SeminarHallBookingInterval({
      seminarHall,
      member,
      bookingDate,
      startTime,
      endTime,
    });

    const bookingInterval = await newBookingInterval.save();
    res.status(201).json({ message: 'Seminar hall booking interval created', bookingInterval });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create seminar hall booking interval.', errorMessage: error.message });
  }
};

// Get all seminar hall booking intervals
const getAllBookingIntervals = async (req, res) => {
  try {
    const bookingIntervals = await SeminarHallBookingInterval.find({})
        .populate('seminarHall', 'name') // Populate seminarHall field and include only 'name' field
        // .populate('department', 'name')//refer to department model
        .populate('member', 'name email');// Populate member field and include 'name' and 'email' fields

    res.json(bookingIntervals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seminar hall booking intervals.', errorMessage: error.message });
  }
};

// Get a specific booking interval by ID
const getBookingIntervalById = async (req, res) => {
  const bookingId = req.params.id; // Get the booking ID from the request parameters

  try {
    const bookingInterval = await SeminarHallBookingInterval.findById(bookingId)
      .populate('seminarHall', 'name') // Populate seminarHall field and include only 'name' field
      // .populate('department', 'name') // Refer to the department model and include 'name' field
      .populate('member', 'name email'); // Populate member field and include 'name' and 'email' fields

    if (!bookingInterval) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    res.json(bookingInterval);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the booking interval.', errorMessage: error.message });
  }
};

// Update the status of a seminar hall booking interval
const updateBookingIntervalStatus = async (req, res) => {
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

    res.json(updatedBookingInterval);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update seminar hall booking interval status.', errorMessage: error.message });
  }
};

// Delete a seminar hall booking interval
const deleteBookingInterval = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBookingInterval = await SeminarHallBookingInterval.findByIdAndDelete(id);
    res.json(deletedBookingInterval);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete seminar hall booking interval.', errorMessage: error.message });
  }
};

module.exports = {
  createBookingInterval,
  getAllBookingIntervals,
  updateBookingIntervalStatus,
  deleteBookingInterval,
  getBookingIntervalById
};
