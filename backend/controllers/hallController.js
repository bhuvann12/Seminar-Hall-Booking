const Hall = require('../model/hallModel');

// Controller function to get all available seminar halls
const getAllHalls = async (req, res) => {
  try {
    const halls = await Hall.find({ availability: true });
    res.json(halls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seminar halls.', errorMessage: error.message });
  }
};
//get single hall
const getHallById = async (req, res) => {
  const { id } = req.params;

  try {
    const hall = await Hall.findById(id);
    if (!hall) {
      return res.status(404).json({ error: 'Seminar hall not found.' });
    }

    res.json(hall);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seminar hall.', errorMessage: error.message });
  }
};

// Controller function to add a new seminar hall
const createHall = async (req, res) => {
  const { name, capacity, facilities, availability } = req.body;
  console.log( name, capacity, facilities, availability )
  try {
    const newHall = new Hall({ name, capacity, facilities, availability });
    await newHall.save();
    res.status(201).json({ message: 'New seminar hall added', hall: newHall });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create seminar hall.', errorMessage: error.message });
  }
};

// Controller function to update a seminar hall
const updateHall = async (req, res) => {
  const { id } = req.params;
  const { name, capacity, facilities, availability } = req.body;
  try {
    const updatedHall = await Hall.findByIdAndUpdate(
      id,
      { name, capacity, facilities, availability },
      { new: true } // Return the updated hall
    );
    res.json(updatedHall);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update seminar hall.', errorMessage: error.message });
  }
};

// Controller function to delete a seminar hall
const deleteHall = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHall = await Hall.findByIdAndDelete(id);
    res.json(deletedHall);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete seminar hall.', errorMessage: error.message });
  }
};

module.exports = {
    getAllHalls,
    createHall,
    updateHall,
    deleteHall,
    getHallById


}