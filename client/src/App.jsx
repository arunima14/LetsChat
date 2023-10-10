import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Chat from "@/components/chat/Chat";
import Login from "./components/login/Login";


function App() {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const isAuth = Boolean(user) && Boolean(password)
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ isAuth ? <Navigate to="/chat" /> : <Login setUser={setUser} setSecret={setPassword} /> } />
          <Route path="/chat" element={ isAuth ? <Chat user={user} password={password} /> : <Navigate to="/" /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
