import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import LOCAL_STORAGE_KEYS from "../../constants/localStorageKeys";

const Account = () => {
  const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PROFILE))
    .result._id;
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [picture, setPicture] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/api/user" + `/getProfile/?id=${userId}`)
        .then(async (res) => {
          setName(res.data.name);
          setEmail(res.data.email);
          setPicture(res.data.profilePicture);
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

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangePicture = (event) => {
    setPicture(event.target.value);
  };

  const handleShowPasswordClicked = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const onUpdateUser = async () => {
    await axios.post(`http://localhost:5000/api/user/update-profile?id=${userId}`, {
      email: email,
      password: password,
      name: name,
      profilePicture: picture
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
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
              required
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
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter New Password"
              value={password}
              onChange={onChangePassword}
              handleShowPassword={handleShowPasswordClicked}
              required
            />
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input
              type="string"
              className="form-control"
              placeholder="Enter Picture URL"
              value={picture}
              onChange={onChangePicture}
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
