import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../css/style.css" // Add a CSS file for custom styling

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const api = "http://localhost:8080/adminuser/usercheck"; // Backend endpoint
    axios
      .post(api, { name: username, password: password })
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
        console.error(err);
      });
  };

  return (
    <div className="admin-container">
      <div className="admin-form-wrapper">
        <h1 className="admin-title">Admin Login</h1>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formAdminName">
            <Form.Label column sm="3">
              Admin Name
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Enter Admin Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formAdminPassword">
            <Form.Label column sm="3">
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </Col>
          </Form.Group>

          <div className="button-container">
            <Button variant="primary" onClick={handleSubmit} className="login-button">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Admin;
