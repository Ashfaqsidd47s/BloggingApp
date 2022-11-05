import React from 'react'
import "./single.css"
import Sidebar from "../../component/sidebar/Sidebar"
import SinglePost from '../../component/singlePost/SinglePost'

function Single() {
  return (
    <>
    <div className="single">
        <SinglePost />
        <Sidebar />
    </div>
    </>
  )
}

export default Single
