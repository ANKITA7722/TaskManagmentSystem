import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = ({ userId }) => {
  const [tasks, setTasks] = useState([]); // State to store fetched tasks
  const [page, setPage] = useState(1); // State for pagination

  // Fetch tasks when `userId` or `page` changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const api = `http://localhost:8080/api/tasks?userId=${userId}&page=${page}`;
        const response = await axios.get(api); // Correct axios usage
        setTasks(response.data.tasks); // Update tasks from API response
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Failed to fetch tasks. Please try again.");
      }
    };
    fetchTasks();
  }, [page, userId]);

  // Handle task deletion
  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const api = `http://localhost:8000/api/tasks/${taskId}`;
      await axios.delete(api); // Correct axios delete call
      setTasks(tasks.filter((task) => task._id !== taskId)); // Remove deleted task
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <div>
      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default TaskList;
