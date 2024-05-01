/* eslint-disable no-unused-vars */
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"


// eslint-disable-next-line react/prop-types
export default function Form({route, method}){
    const[userName, setUserName] = useState("")
    const[password, setPassword] = useState("")
    const[loading, setloading] = useState(true)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setloading(true)
        e.preventDefault()

        try{
            const res = await api.post(route, {userName, password})
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            }
            else{
                navigate("/login")
            }
        }
        catch(error){
            alert(error)
        } finally{
            setloading(false)
        }
    }
 
    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input 
            type="text" 
            className="form-input" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="UserName"
        />
        <input 
            type="password" 
            className="form-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PassWord"
        />
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}