import React from 'react';
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const navigate = useNavigate();

  

    return(
        <>
        <h1>Task Managment System</h1>
        <button onClick={()=>{navigate("/admin")}}>  AdminLogin</button>
        <button onClick={()=>{navigate("/login")}}>  user Login</button>
        <button onClick={()=>{navigate("/registration")}}> Registration Login</button>
        </>
    )
}
export default Home;