import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const DisplayData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend
    axios
      .get("http://localhost:8080/employees/displaysdata")
      .then((response) => {
        // Transform the data to include tasks array
        const transformedData = response.data.map((user) => {
          return {
            ...user,
            tasks: user.title && user.description 
              ? [{ title: user.title, description: user.description }] 
              : [],
          };
        });
        setUsers(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error.message);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>User Data</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Task Titles</th>
            <th>Task Descriptions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.tasks.map((task, index) => (
                  <div key={index}>{task.title}</div>
                ))}
              </td>
              <td>
                {user.tasks.map((task, index) => (
                  <div key={index}>{task.description}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayData;
