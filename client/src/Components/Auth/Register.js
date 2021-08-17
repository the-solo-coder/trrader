import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';


const Register = () => {
    const [userData, setUserData] = useState({});
    const handleChange = evt => {
        setUserData({...userData, [evt.target.name]: evt.target.value})
    }
    const handleSubmit = async evt => {
        evt.preventDefault();
        const response = await axios.post("http://localhost:5000/api/user/register", {data: userData, withCredentials: true});
        console.log(response.data);
    }
    return (
        <div className="Register">
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" name="username" />
                <input type="email" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <input type="text" placeholder="Display Name" name="displayName" />
                <button>Register</button>
            </form>            
        </div>
    )
}

export default Register
