import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { LOGIN } from "../../constants/actionTypes";
import * as api from "../../api/index";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const login = (formData, history, errorM) => async (dispatch) => {
    try {
      // log in the user
      const { data } = await api.login(formData);
      dispatch({ type: LOGIN, data });
      history.push("/");
    } catch (err) {
      errorM = err.response.data;
      console.log(errorM);
      setErrorMsg(errorM);
    }
  };
  const handleSubmit = async (e) => { 
    e.preventDefault();
    dispatch(login(formData, history));
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign In</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <>
            </>
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Grid>
          <br/>
          {errorMsg && <p style={{color:'red'}}> {errorMsg} </p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <p>
            Not registered? <a href="auth">Click Here</a> to register.
          </p>
        </form>
      </Paper>
    </Container>
  );
};
export default Login;