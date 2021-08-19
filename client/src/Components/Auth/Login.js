
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';


const Login = () => {
    const [userData, setUserData] = useState({});
    const handleChange = evt => {
        setUserData({...userData, [evt.target.name]: evt.target.value});
    }
    const handleSubmit = async evt => {
        evt.preventDefault();
        const response = await axios.post("http://localhost:5000/api/user/login", {data: userData});
        console.log(response.data);
    }
    return (
        <div className="Login">
            <form onSubmit={handleSubmit} onChange={handleChange} >
                <input type="text" placeholder="Username" name="username"  />
                <input type="password" placeholder="Password" name="password"  />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
