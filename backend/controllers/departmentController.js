const Department = require("../model/departmentModel");
const Member = require('../model/memberModel');

//get all departments
const getAllDepartments = async (req, res) => {
    try {
      // Fetch all departments from the database and populate the members field with member details
      const departments = await Department.find({})
        .sort({ createdAt: -1 })
        .populate('members', 'name email'); // Populate the 'members' field with 'name' and 'email' fields from the 'Member' collection
  
      // Return the departments in the response
      res.json(departments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch departments.', errorMessage: error.message });
    }
  };
  
// Controller function to create a new department
const createDepartment = async (req, res) => {
    const { name, description, contactEmail, members } = req.body;
    
    try {
      // Create the department in the Department collection
      const newDepartment = new Department({
        name,
        description,
        contactEmail,
      });
  
      const department = await newDepartment.save();
  
      // Create an array to store member references for the department
      const memberReferences = [];
  
      // Create members for the department and store their references
      for (const memberData of members) {
        const { name, email } = memberData;
  
        const newMember = new Member({
          name,
          email,
          department: department._id, // Assign the department's _id to the member's department field
        });
  
        const member = await newMember.save();
        memberReferences.push(member._id); // Store the member's _id in the memberReferences array
      }
  
      // Update the department with member references
      department.members = memberReferences;
      await department.save();
  
      res.status(201).json({ message: 'New department created', department });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create department.', errorMessage: error.message });
    }
  };


// Controller function to add a department member
const addDepartmentMember = async (req, res) => {
    const { departmentId, name, email } = req.body;
  
    try {
      // Validate the input data here if needed
      // For example, check if the required fields are present
  
      // Find the department in the database by its ID
      const department = await Department.findById(departmentId);
  
      if (!department) {
        return res.status(404).json({ error: 'Department not found.' });
      }
  
      // Check if the member already exists in the Member collection
      let member = await Member.findOne({ name, email });
  
      if (!member) {
        // If the member is not found, create a new member entry in the collection
        member = new Member({ name, email });
        await member.save();
      }
  
      // Add the member's ObjectId to the department's members array
      department.members.push(member._id);
  
      // Save the updated department document
      await department.save();
  
      res.status(201).json({ message: 'New department member added', department });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add department member.', errorMessage: error.message });
    }
  };
  

module.exports = {
    getAllDepartments,
    createDepartment,
    addDepartmentMember
}