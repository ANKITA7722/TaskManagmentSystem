const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Route to create a new task
router.post('/createtask', taskController.createTask);
router.get("/tasks/gettasks/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const tasks = await Task.find({ assignedTo: userId });
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });
  

module.exports = router;
