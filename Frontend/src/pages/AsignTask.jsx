import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message, Spin } from 'antd'; // Import required Ant Design components
import axios from 'axios';
import "../css/style.css";

const Task = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false); // For showing loading spinner

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            message.error("Please fill in all fields.");
            return;
        }

        const taskData = {
            title,
            description,
        };

        const token = localStorage.getItem('authToken'); 
        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:8080/tasks/createtask", 
                taskData, 
                {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                }
            );

            message.success("Task created successfully!");
            setTitle(""); // Clear form after successful submission
            setDescription(""); // Clear form after successful submission
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (err.response) {
                message.error(`Error: ${err.response.data}`);
            } else if (err.request) {
                message.error("Error: No response from server.");
            } else {
                message.error(`Error: ${err.message}`);
            }
        }
    };

    return (
        <Row justify="center" className="task-page">
            <Col xs={24} sm={20} md={16} lg={12}>
                <div className="task-card">
                    <h2 className="task-title">Create New Task</h2>

                    <Form onSubmitCapture={handleSubmit} layout="vertical">
                        <Form.Item label="Task Title" required>
                            <Input
                                placeholder="Enter task title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item label="Task Description" required>
                            <Input.TextArea
                                rows={4}
                                placeholder="Enter task description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                block
                                loading={loading} // Show loading spinner while submitting
                            >
                                Save Task
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default Task;
