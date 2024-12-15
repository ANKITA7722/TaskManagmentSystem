import React, { useState, useEffect } from 'react';
import { Card, Button, message, Spin } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:8080/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTask(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching task details:", err);
        setError("Failed to fetch task details.");
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card
      title={task.title}
      extra={<span>{task.userName}</span>}
      style={{ width: 600, margin: '50px auto' }}
    >
      <p>{task.description}</p>
      <Button type="primary">Edit Task</Button>
    </Card>
  );
};

export default TaskDetails;
