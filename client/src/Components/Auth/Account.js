import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import { ACCOUNT } from "../../constants/actionTypes";
import * as api from "../../api/index";
import { updateUser } from "../../actions/users";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LOCAL_STORAGE_KEYS from "../../constants/localStorageKeys";

const Account = () => {
  const [userData, setUserData] = useState({});
  const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PROFILE))
    .result._id;
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/api/user" + `/getProfile/?id=${userId}`)
        .then(async (res) => {
          setName(res.data.name);
          setEmail(res.data.email);
          await console.log(name, email);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const onChangename = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onUpdateUser = async (event) => {
    event.preventDefault();
    dispatch(updateUser(userId, { name, email }));
    history.push("/");
  };

  return (
    <div className="content-wrapper">
      <form onSubmit={onUpdateUser}>
        <div className="card-Header">
          <h4>Edit Account</h4>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              type="string"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={onChangename}
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              type="string"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="string"
              className="form-control"
              placeholder="Enter New Password"
              value={password}
              //onChange={onChangeValue}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="string"
              className="form-control"
              placeholder="Repeat New Password"
              //value={targetValue}
              //onChange={onChangeValue}
            />
          </div>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          &nbsp;
        </div>
      </form>
    </div>
  );
};

export default Account;
