const express = require('express');
const router = express.Router();

const {
    getAllDepartments,
  createDepartment,
  addDepartmentMember,
} = require('../controllers/departmentController');

// Route for getting all the department
router.get('/', getAllDepartments);

// Route for creating a new department
router.post('/', createDepartment);

// Route for adding a department member
router.post('/:departmentId/members', addDepartmentMember);

// Export the router
module.exports = router;
