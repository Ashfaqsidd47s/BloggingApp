import React from 'react'
import "./header.css";

function Header() {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className="headerTitleSm">React & Node</span>
            <span className="headerTitleLg">Blog</span>
        </div>
        <img src="https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_960_720.jpg" 
        alt="" className="headerImg" />
    </div>
  )
}

export default Header
