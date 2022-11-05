import React, { useContext,useState , useReducer } from 'react'
import Sidebar from '../../component/sidebar/Sidebar';
import { Context } from '../../context/Context';
import "./settings.css";
import axios from 'axios';

function Settings() {
    const PF = "http://localhost:8080/images/";
    const {user,dispatch } = useContext(Context);
    const [file,setFile] = useState(null);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [success,setSuccess] = useState(false);

    const handelSubmit =async (e)=>{
        e.preventDefault();
        dispatch({type: "UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            email: email,
            password: password,
            username: username,
        };
        if(file){
            const data =new FormData();
            const filename = Date.now() +file.name;
            data.append("name",filename);
            data.append("file",file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("http://localhost:8080/api/upload", data)
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res =await axios.put("http://localhost:8080/api/users/" +user._id,updatedUser);
            setSuccess(true);
            dispatch({type: "UPDATE_SUCCESS",payload: res.data});
        } catch (err) {
            dispatch({type: "UPDATE_FAILURE"});
        }
    };

  return (
    <>
    <div className="settings">
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update your Account</span>
                <span className="settingsDeleteTitle">Delete your Account</span>
            </div>
            <form className="settingsForm" onSubmit={handelSubmit}>
                <label htmlFor="">Profile Picture</label>
                <div className="settingsPP">
                    <img 
                        src={file ? URL.createObjectURL(file) : PF + user.profilePic} 
                        alt="" 
                    />
                    <label htmlFor="fileInput">
                    <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                    </label>
                    <input id="fileInput"
                        type="file" 
                        style={{display:"none"}}
                        onChange={(e)=> setFile(e.target.files[0])}
                    />
                </div>
                <label >UserName</label>
                <input type="text" placeholder={user.username} onChange={(e)=> setUsername(e.target.value)}/>
                <label >Email</label>
                <input type="email" placeholder={user.email} onChange={(e)=> setEmail(e.target.value)}/>
                <label >Password</label>
                <input type="password" placeholder="enter password" onChange={(e)=> setPassword(e.target.value)}/>
                <button className="settingsSubmit" type='submit'>Update</button>
            </form>
            {success && <span className="successMsz">Profile successfully updated..</span>}
        </div>
        <Sidebar />
    </div>
    </>
  )
}

export default Settings
