// components/UserTable.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let api = "http://localhost:8080/employees/displayusersdata";
        axios.get(api)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);


    const ans = users.map((key) => {
        return (
            <>
                <tr>
                    <td>{key.name}</td>
                    <td>{key.email}</td>
                    <button onClick={()=>{navigate("/task")}}> task </button>
                </tr>
            </>
        )
    })

    return (
        <div className="container mt-4">
            <h2>User Data</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>
                            <button>AsignTask </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {ans}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable;
