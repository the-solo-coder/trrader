import React from 'react';
<<<<<<< Updated upstream
import './Login.css';
import {Button, Form, FormGroup, Label,Input} from 'reactstrap';
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    
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
=======
    <div className="content-wrapper">
        <form onSubmit={this.handleSubmit}>
        <div className="card-Header">
        <h4 >Login</h4>
            </div>
        <div className="card-body">
            <div className="form-group">
                <p>Email</p>
            <input type='email'name='email'  required onChange={this.handleChange}/>
            </div>
            <div  className="form-group">
            <p>Password</p>
            <input type='password'name='pwd'  required onChange={this.handleChange}/>
            </div> 
            <div className="card-footer">
            
                <button className="btn btn-primary" onSubmit={this.handleSubmit}>Login</button>
                <button className="btn btn-primary" onSubmit={this.handleSubmit}>Register</button>
             </div> 
            
                </div>
        </form>
    </div>
>>>>>>> Stashed changes
        )
    }
}

    
export default Login;