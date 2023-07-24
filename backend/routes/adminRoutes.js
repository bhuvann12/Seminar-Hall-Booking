// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const {
    updateBookingStatus
} = require('../controllers/adminController');

// Update the status of a seminar hall booking interval by the admin
router.put('/:id', updateBookingStatus );

module.exports = router;
