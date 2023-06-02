import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./components/Login/login"
import Register from "./components/Register/Register"
import Dashboard from "./components/Dashboard/Dashboard"
import { MyContext } from "./Context/MyContext"
import { useState } from "react"
function App() {
 
const [loginData,setLoginData]=useState({});

  return (
    <MyContext.Provider value={{loginData,setLoginData}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </MyContext.Provider>
  )
}

export default App
