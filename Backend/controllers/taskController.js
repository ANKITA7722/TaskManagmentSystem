const taskModel = require("../models/taskModel");

// Controller to create a new task
const createTask = async (req, res) => {
    const { title, description, username, email, password } = req.body;

    try {
        // Check if the user already exists based on email
        const data = await taskModel.find({ email });


        // If email doesn't exist, create a new task
        const newTask = new taskModel({
            title,
            description,
            username,
            email,
            password, // You should ideally hash the password before saving
        });

        await newTask.save(); // Save the new task to the database

        res.status(201).send("Task created successfully!");
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).send("Error creating task.");
    }
};


const MyUser = async (req, res) => {
    const userId = req.user.id; // Example: using a user ID from session or JWT token
    User.findById(userId)
        .then(user => res.json({ email: user.email, username: user.username }))
        .catch(err => res.status(500).json({ message: 'Error fetching user data.' }));
}


// controllers/taskController.js

const getUserTasks = async (req, res) => {
    try {
        const users = await taskModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
};



const pending = async (req, res) => {
    try {
        const user = await taskModel.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error updating task status", error: error.message });
    }
};

const Delete = async (req, res) => {
    const taskId = req.params.id;
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`);
        console.log('Task deleted successfully:', response.data);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}


const Update=async(req,res)=>{
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedUser = await taskModel.findByIdAndUpdate(
            id,
            { title, description },
            { new: true } // Returns the updated document
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser); // Send updated user back to the client
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createTask, 
    MyUser,
     getUserTasks,
      pending, 
      Delete,
      Update,
};
