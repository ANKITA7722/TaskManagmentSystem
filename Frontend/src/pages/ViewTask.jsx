import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Card, Button } from "react-bootstrap";
import { Form } from 'react-bootstrap';


const ViewData = () => {
    const [users, setUsers] = useState([]);
    const [editingTask, setEditingTask] = useState(null); // Store the task being edited
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    useEffect(() => {
        // Fetch user data from the backend API
        axios
            .get("http://localhost:8080/tasks/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error.message);
            });
    }, []);

    const handlePendingClick = (taskId) => {

        axios
            .patch(`http://localhost:8080/api/users/${taskId}`, { status: 'pending' })
            .then(() => {
                // Update the UI with pending status
                setUsers(users.map((user) =>
                    user._id === taskId ? { ...user, status: 'pending' } : user
                ));
            })
            .catch((error) => {
                console.error("Error updating task status:", error.message);
            });
    };


    const handleDeleteClick = (userId) => {
        // Delete the task
        axios.delete(`http://localhost:8080/api/tasks/${userId}`)
            .then(response => {
                // Handle success
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });

    };

    const handleEditClick = (taskId, title, description) => {
        setEditingTask(taskId);
        setNewTitle(title);
        setNewDescription(description);
    };

    const handleSaveEdit = (taskId) => {
        axios
            .put(`http://localhost:8080/api/users/${taskId}`, {
                title: newTitle,
                description: newDescription,
            })
            .then((response) => {
                const updatedTask = response.data; // Backend response
                // Update state with the new task details
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === taskId
                            ? { ...user, title: updatedTask.title, description: updatedTask.description }
                            : user
                    )
                );
                setEditingTask(null); // Close editing form
            })
            .catch((error) => {
                console.error("Error editing task:", error.message);
            });
    };




    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4" style={{ color: '#333' }}>User Data with Tasks</h2>
            <Card className="shadow-lg p-4">
                <Table striped bordered hover responsive="sm">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.title}</td>
                                <td>{user.description}</td>
                                <td>
                                    <Button variant="primary"
                                        onClick={() => handlePendingClick(user._id)}> pending</Button>
                                    <Button variant="primary"
                                        onClick={() => handleEditClick(user._id, user.title, user.description)}> Edit </Button>
                                    <Button variant="primary"
                                        onClick={() => handleDeleteClick(user._id)}>delete</Button>


                                    {editingTask === user._id && (
                                        <div>
                                            <Form.Control
                                                type="text"
                                                value={newTitle}
                                                onChange={(e) => setNewTitle(e.target.value)}
                                                placeholder="Edit Title"
                                            />
                                            <Form.Control
                                                type="text"
                                                value={newDescription}
                                                onChange={(e) => setNewDescription(e.target.value)}
                                                placeholder="Edit Description"
                                            />
                                            <Button onClick={() => handleSaveEdit(user._id)} variant="primary">
                                                Save
                                            </Button>
                                            <Button onClick={() => setEditingTask(null)} variant="secondary">
                                                Cancel
                                            </Button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};

export default ViewData;
