import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./sidebar.css"

function Sidebar() {
  const [cats,setCats]= useState([]);

  useEffect(()=>{
    const getCats = async ()=>{
      const res = await axios.get("http://localhost:8080/api/categories");
      setCats(res.data);
      console.log("cats:",cats)
    };
    getCats();
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_960_720.jpg" 
        alt="" />
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing
         elit. Autem odit voluptas architecto in. Aliquam vel omnis ex 
         nostrum adipisci aspernatur possimus id soluta quae necessitatibus officia
          voluptatum quos sit dicta rem cum, ipsa iure!
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c)=> (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
            <i className="sidebarIcon fa-brands fa-square-facebook"></i>
            <i className="sidebarIcon fa-brands fa-square-twitter"></i>
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
            <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
