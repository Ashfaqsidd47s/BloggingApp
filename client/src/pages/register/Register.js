import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./register.css"
import axios from "axios";

function Register() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [err,setErr] = useState(false);

  const handelSubmit =async (e)=>{
    e.preventDefault();
    setErr(false);
    try {
      const res =await axios.post("http://localhost:8080/api/auth/register",{username:username , email:email , password:password});
      console.log(res);
      res.data && window.location.replace("/login");
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  }

  return (
    <div className="register">
    <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handelSubmit}>
            <label>User Name</label>
            <input className="registerInput" 
              type="text" 
              placeholder="User Name..." 
              onChange={e =>setUsername(e.target.value)}
            />
            <label>Email</label>
            <input className="registerInput" 
              type="text" 
              placeholder="Enter your email..." 
              onChange={e =>setEmail(e.target.value)}
            />
            <label>Password</label>
            <input className="registerInput" 
              type="Password" 
              placeholder="Enter your password.." 
              onChange={e =>setPassword(e.target.value)}
            />
            <button className="registerButton" type="submit">Register</button>
            <button className="registerLoginButton">
              <Link className="link" to="/login">Login</Link>
            </button>
            {err &&<span style={{color:"red"}}>Something went wrong.... </span>}
        </form>
    </div>
  )
}

export default Register
