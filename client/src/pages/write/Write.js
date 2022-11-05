import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context';
import "./write.css"

function Write() {
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [file,setFile] = useState(null);
    const { user } = useContext(Context);

    const handelSubmit =async (e)=>{
        e.preventDefault();
        const newPost = {
            title,
            desc,
            username: user.username,
        };
        if(file){
            const data =new FormData();
            const filename = Date.now() +file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.photo = filename;
            try {
                await axios.post("http://localhost:8080/api/upload", data)
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.post("http://localhost:8080/api/posts",newPost);
            window.location.replace("/post/"+res.data._id)
        } catch (err) {
            
        }
    };
    
  return (
    <>
    <div className="write">
        {file &&(
            <img className="writeImg"
                src={URL.createObjectURL(file)} 
                alt="not loaded" 
            />
        )}
        <form className="writeForm" onSubmit={handelSubmit}>
            <div className="writeFormGroup">
            <label htmlFor="fileInput">
                <i className="writeIcon fa-solid fa-plus"></i>
            </label>
                <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                <input 
                    type="text" 
                    placeholder="Title" 
                    className="writeInput" 
                    autoFocus={true}
                    onChange={e=>setTitle(e.target.value)}
                />
            </div>
            <div className="writeFormGroup">
                <textarea 
                    placeholder="Tell your story....." 
                    type="text" 
                    className="writeInput writeText"
                    onChange={e=>setDesc(e.target.value)}
                ></textarea>
            </div>
            <button className="writeSubmit" type="submit">Publish</button>
        </form>
    </div>
    </>
  )
}

export default Write
