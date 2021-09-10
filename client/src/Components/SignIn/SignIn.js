import React, {useState} from "react";
import"./SignIn.css";
import {Button, Form, FormGroup, Label,Input} from 'reactstrap';


const SigIn= () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

    const handleChange = (e) => {
      setUser({
        ...user,
          [e.target.email]: e.target.value,
          [e.target.password]: e.target.value
      });
    };
    

  const handleSubmit=(e)=>{
    e.preventDefault();
      console.log(user);

}

  return(
    <div>
    <Form className="login-form" onSubmit={handleSubmit}>
      <span>
        <h1 className="font-weight-bolt text-center"> Trrader Login</h1>
      </span> 
        <h2 className="text-center">Welcome</h2>

          <FormGroup>
            <Label>Email</Label>
              <Input type="email" placeholder="Email"
              onInput={handleChange}>
              </Input>
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
              <Input type="password" placeholder="Password" onInput={handleChange}></Input>
          </FormGroup>

      <Button className="btn-lg btn-dark btn-block">Login</Button>
        <span className="p-2"></span>
          <p> <a  href="/forgot-password" >Forgot Password</a></p>  
    </Form> 
    </div>  
  );
};
   
export default SigIn;