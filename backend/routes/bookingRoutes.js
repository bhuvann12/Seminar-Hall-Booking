const express = require('express');


// Import your booking controller (assuming you have a separate booking controller file)
const {
    createBookingInterval,
    getAllBookingIntervals,
    updateBookingIntervalStatus,
    deleteBookingInterval,
    getBookingIntervalById

} = require("../controllers/bookingController")

const router = express.Router()

// Define routes and their corresponding route handlers
router.get('/',getAllBookingIntervals);

router.get('/:id',getBookingIntervalById);

router.post('/',  createBookingInterval,);

router.put('/:id', updateBookingIntervalStatus);

router.delete('/:id', deleteBookingInterval);


// Export the router
module.exports = router;
