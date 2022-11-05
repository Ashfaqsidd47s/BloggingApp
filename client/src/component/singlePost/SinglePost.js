import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import "./singlePost.css"
import axios from 'axios';
import { Context } from '../../context/Context';
import Settings from '../../pages/settings/Settings';

function SinglePost() {
    const PF = "http://localhost:8080/images/";
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post,setPost] = useState({});
    const { user } = useContext(Context);
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [updateMode,setUpdateMode] = useState(false);

    useEffect(()=>{
        const getPost = async ()=>{
            const res =await axios.get("http://localhost:8080/api/posts/" +path);
            console.log(res);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    },[path]);

    const handelDelete = async()=>{
        try {
            await axios.delete("http://localhost:8080/api/posts/" +path,{data:{username:user.username}});
            window.location.replace("/");
        } catch (err) {}
    };

    const handelUpdate =async ()=>{
        try {
            await axios.put("http://localhost:8080/api/posts/" +path,{username:user.username, title:title, desc:desc});
            setUpdateMode(false);
        } catch (err) {}
    }

  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
            {post.photo &&
                <img className="singlePostImg"
                    src={PF + post.photo} 
                    alt="" 
                />
            }
            {updateMode ? (
                <input className="singlePostTitleInput" 
                    type="text" 
                    value={title}
                    autoFocus="true"
                    onChange={(e)=>setTitle(e.target.value)}
                />
            ) :(
            <h1 className="singlePostTitle">
                {title}
                {post.username === user?.username && (
                <div className="singlePostEdit">
                    <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                    <i className="singlePostIcon fa-solid fa-trash-can" onClick={handelDelete}></i>
                </div>
                )}
            </h1>
                )
            }
            <div className="singlePostInfo">
                <span className="singlePostAuthor">
                Author: 
                <Link to={`/?user=${post.username}`} className="link">
                    {post.username}
                </Link>
                </span>
                <span className="singlePostDate">{new Date(post.updatedAt).toDateString()}</span>
            </div>
            {updateMode ? (
                <textarea className="singlePostDescInput" 
                    value={desc}
                    onChange={(e)=>setDesc(e.target.value)}
                />
            ) :(
                <p className="singlePostDesc">{desc}</p>
            )}
            {updateMode && (
                <button className="singlePostButton" onClick={handelUpdate}>Update</button>
            )}
        </div>
    </div>
  )
}

export default SinglePost
