import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "../CSS/Style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      let api = "http://localhost:8080/employees/employeelogin";
      const res = await axios.post(api, { email: email, password: password });
      console.log(res.data);
      localStorage.setItem("email", res.data[0].email);
      localStorage.setItem("password", res.data[0].password);
    //   navigate("/dashboard");
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <>
      <div className="LoginParent">
        {/* <div className="child-1">
          <img
            src="" // Sample image placeholder
            alt="Login"
          />
        </div> */}
        <div className="child-2">
          <h1>User Login</h1>
          <label>
            Enter Email: 
            <input
              type="email" placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <br />
          <label>
            Enter Password: 
            <input
              type="password" placeholder="Enter your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <br />
          <button onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
