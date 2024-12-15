import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom"; // Un-comment this import
import Button from 'react-bootstrap/Button';
import axios from "axios";

const Admin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = () => {
        const api = "http://localhost:8080/adminuser/usercheck"; // Ensure this is correct
        axios.post(api, { name: username, password: password })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    message.success("You have successfully logged in");
                     navigate("/adminpanal"); 
                } else {
                    message.error(res.data.msg || "Invalid credentials");
                }
            })
            .catch((err) => {
                message.error("An error occurred. Please try again.");
                console.error(err); // Log the error for debugging
            });
    };

    return (
        <>
            <center>
                <h1> Admin Login</h1>
            </center>
            <Form width="50%">
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Enter User
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            placeholder="Enter Admin Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                    Login
                </Button>
            </Form>
        </>
    );
};

export default Admin;
