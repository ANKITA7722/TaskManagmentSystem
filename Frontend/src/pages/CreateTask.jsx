import React, { useState } from "react";
import axios from "axios";

const CreateTask = ({ userId }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = "http://localhost:8080/api/tasks";
      await axios.post(api, { ...taskData, userId }); 
      alert("Task created successfully!");
      setTaskData({ title: "", description: "", dueDate: "", priority: "medium" }); // Reset form
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          placeholder="Title"
          value={taskData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={taskData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={taskData.dueDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;
