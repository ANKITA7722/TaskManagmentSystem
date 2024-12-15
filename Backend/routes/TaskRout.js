const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Route to create a new task
router.post('/createtask', taskController.createTask);
router.get('/employees/me', taskController.MyUser);
router.get("/users", taskController.getUserTasks);

router.patch("/api/users/:id",taskController.pending )
router.delete('/tasks/:id',taskController.Delete )
router.put("/api/users/:id",taskController.Update )

  
module.exports = router;
