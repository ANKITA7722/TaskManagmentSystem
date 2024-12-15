import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    // Fetch user data from the backend
    const api = "http://localhost:8080/employees/displayusersdata";
    axios
      .get(api)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setUsers(response.data); // Ensure data is an array before setting state
        } else {
          console.error("API response is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{ color: '#333' }}>User Data</h2>
      <Card className="shadow-lg p-4">
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Assign Task</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id || user.email}> {/* Fallback to email if _id is missing */}
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => navigate("/task")}
                      style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                    >
                      Task
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default UserTable;
