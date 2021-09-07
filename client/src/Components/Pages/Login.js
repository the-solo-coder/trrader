import React from 'react';
import './Login.css';
import {Button, Form, FormGroup, Label,Input} from 'reactstrap';

class Login extends React.Component{
    state={
        email:'',
        password:''
    }

handleChange=(e)=>{
    const {name, value}=e.target
    this.setState({[name]:value})
}

handleSubmit=(e)=>{
    e.preventDefault()
}

render(){
  return(
    
    <Form className="login-form">
        
        <h1 className=" text-center" > Trrader Login</h1>
        <h2 className="text-center">Welcome</h2>
    <FormGroup>
        <Label>Email</Label>
        <Input type="email" placeholder="Email"></Input>
    </FormGroup>

    <FormGroup>
        <Label>Password</Label>
        <Input type="password" placeholder="Password"></Input>
    </FormGroup>

    <Button className="btn-lg btn-dark btn-block">Login</Button>
    <span className="p-2"></span>
    <p> <a  href="/forgot-password" >Forgot Password</a></p>  
</Form>      
        )
    }
}

    
export default Login;