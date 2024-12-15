import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import "../CSS/Style.css"; // Import the CSS for styling

const Registration = () => {
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = () => {
    let api = "http://localhost:8080/employees/employeeregistration";
    axios.post(api, input).then((res) => {
      message.success("You are successfully Registered!");
    }).catch((err) => {
      message.error("Registration failed, please try again!");
    });
  };

  return (
    <>
      <div className="RegParent">
      <div className="rchild">
          <h1>User Registration</h1>
          <label>
            Enter Name:
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              value={input.name || ""}
              onChange={handleInput}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Enter Email:
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={input.email || ""}
              onChange={handleInput}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Enter Password:
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={input.password || ""}
              onChange={handleInput}
              className="input-field"
            />
          </label>
          <br />
          <button onClick={handleSubmit} className="submit-button">
            Register!
          </button>
        </div>
      </div>
    </>
  );
};

export default Registration;
