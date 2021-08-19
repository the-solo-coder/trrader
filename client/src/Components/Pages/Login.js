import React from 'react';
import { render } from 'react-dom';


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

}
render(){
  return(
    <div className="content-wrapper">
        <form onSubmit={this.handleSubmit}>
            <input type='email'name='email' placeholder='email...' required onChange={this.handleChange}/>
            <input type='password'name='pwd' placeholder='password...' required onChange={this.handleChange}/>
                <button onSubmit={this.handleSubmit}>Log in</button>
        </form>
    </div>
        )
    }
}
    


export default Login;