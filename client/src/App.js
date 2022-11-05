import React, { useContext } from "react";
import Write from "./pages/write/Write";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Topbar from "./component/topbar/Topbar"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Context } from "./context/Context";


function App() {
  const {user} = useContext(Context);

  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
        <Route path="/settings" element={user ? <Settings />: <Navigate to="/register"/>} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/write" element={user ? <Write /> : <Navigate to="/register"/>} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
