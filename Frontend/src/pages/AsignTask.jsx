import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import React, { useState } from 'react';

const Task = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        const api = "http://localhost:8080/tasks/createtask";

        const taskData = {
            title,
            description,
        };

        try {
            const response = await axios.post(api, taskData);
            console.log(response.data);

            if (response.status === 201) {
                alert("Task saved successfully!");
                setTitle("");
                setDescription("");
            } else {
                // alert("Error saving task: " + response.data.message);
                alert("Task saved successfully!");
            }
        } catch (error) {
            console.error("Error saving task:", error);
            alert("An error occurred while saving the task.");
        }
    };

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Button variant="success" onClick={handleSubmit}>
                    Save Task
                </Button>
            </Form>
        </>
    );
};

export default Task;
