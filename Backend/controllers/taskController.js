const taskModel = require("../models/taskModel");

// Controller to create a new task
const createTask = async (req, res) => {
     const {title,description} = req.body;
        const empdata=await taskModel.create({
            title:title,
            description:description
        })
    
        res.send(empdata);
};

module.exports = { createTask };
