import React, { useEffect, useState } from 'react';
import "./home.css";
import axios from "axios";
import Header from '../../component/header/Header';
import Posts from '../../component/posts/Posts';
import Sidebar from '../../component/sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

function Home() {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get("http://localhost:8080/api/posts" +search)
      setPosts(res.data);
      console.log("post:",posts)
    }
    fetchPosts();
  },[search]); 

  return (
      <>
        <Header />
        <div className="home">
            <Posts posts={posts}/>
            <Sidebar />
        </div>
    </>
  )
}

export default Home
