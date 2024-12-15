import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import editimg from "../images/edit.png";
// import delimg from "../images/delete.png";
import Table from 'react-bootstrap/Table';

const Update = () => {
    const [mydata, setMydata] = useState([]);
    const navigate = useNavigate();

    const loadData = () => {
        let api = "http://localhost:8080/employees/employeeupdatedisplay";
        axios.get(api).then((res) => {
            setMydata(res.data);
            console.log("Data loaded successfully");
        }).catch((err) => {
            console.error("Error loading data", err);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    const myrecDel = (id) => {
        let api = `http://localhost:8080/employees/${id}`;  // Add id as a URL parameter
    
        axios.delete(api)
            .then((res) => {
                alert("Data deleted!!!");
                loadData();  // Reload data after deletion
            })
            .catch((err) => {
                console.error("Error deleting data", err);
            });
    };
    

    const myrecEdit = (id) => {
        navigate(`/editdata/${id}`);
    };

    const ans = mydata.map((key) => {
        return (
            <tr key={key._id}>
                <td>{key.empno}</td>
                <td>{key.name}</td>
                <td>{key.city}</td>
                <td>{key.salary}</td>
                <td>
                    <button onClick={() => { myrecEdit(key._id) }} style={{ border: 'none', background: 'none' }}>
                        {/* <img src={editimg} width="30" height="30" alt="Edit" /> */} edit
                    </button>
                    
                    <button onClick={() => {myrecDel(key._id) }} style={{ border: 'none', background: 'none' }}>
                        {/* <img src={delimg} width="30" height="30" alt="Delete" /> */}delete
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <>
            <h1>Update My Records</h1>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Emp No.</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ans}
                </tbody>
            </Table>
        </>
    );
};

export default Update;
