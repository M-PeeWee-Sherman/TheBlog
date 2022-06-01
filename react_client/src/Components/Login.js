//https://codesandbox.io/s/login-form-material-ui-u1xjl?file=/src/App.js:0-1082
//converted from class to function style
import React, { useState } from "react";
import "./styles.css";
import CustomInput from "./components/CustomInput";
import Button from "./components/Button";

 const Login = ()=>{
  const [loginInfo, setLoginInfo] = useState({username:"",password:""});

  const handleChange = e => {
    setLoginInfo({ [e.currentTarget.id]: e.currentTarget.value });
  };


    return (
      <div className="App">
        <form className="form">
          <CustomInput
            labelText="Username"
            id="username"
            formControlProps={{
              fullWidth: true
            }}
            handleChange={handleChange}
            type="text"
          />
          <CustomInput
            labelText="Password"
            id="password"
            formControlProps={{
              fullWidth: true
            }}
            handleChange={handleChange}
            type="password"
          />

          <Button type="button" color="primary" className="form__custom-button"
          onClick={(e)=>{
            e.preventDefault();
            window.alert(`username:${loginInfo.username}--password:${loginInfo.password}`)}>
            Log in
          </Button>
        </form>
      </div>
    );
  
}
