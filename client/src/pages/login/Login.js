import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';
import "./login.css";

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {user,dispatch,isFetching} = useContext(Context);

  const handelSubmit=async (e)=>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    console.log("isfetchng:",isFetching)
    try {
      const res =await axios.post("http://localhost:8080/api/auth/login",{email:email , password: password});
      console.log(res);
      dispatch({type: "LOGIN_SUCCESS", payload: res.data });
      console.log("user:",user);
    } catch (err) {
      console.log(err);
      dispatch({type: "LOGIN_FAILURE"});
    }
  };


  return (
    <div className="login">
    <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handelSubmit}>
            <label>Email</label>
            <input className="loginInput" 
              type="text" 
              placeholder="Enter your email..." 
              onChange={e=>setEmail(e.target.value)}
            />
            <label>Password</label>
            <input className="loginInput" 
              type="Password" 
              placeholder="Enter your password.." 
              onChange={e=>setPassword(e.target.value)}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            <button className="loginRegisterButton">
              <Link className="link" to="/register">Register</Link>
            </button>
        </form>
    </div>
  )
}

export default Login
