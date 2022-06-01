//https://codesandbox.io/s/signupregistration-form-reactmaterialui-fr71m?file=/src/components/Registration.jsx:0-7111
import React, { useState, Component } from "react";
//import { withStyles } from "@material-ui/core/styles";
//import { register } from "./RegistrationStyles";
import InputAdornment from '@mui/material/InputAdornment';

import CssBaseline from "@mui/material//CssBaseline";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { FormControl, Input, InputLabel, Button } from "@mui/material/";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Icon from "@mui/material/Icon";
import ErrorIcon from "@mui/icons-material/Error";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import Modal from '@mui/material/Modal';

const Registration = ({open, setOpen})=>{

    const [userParams, setUserParams] = useState({
      username:"",
      firstname:"",
      lastname:"",
      password:"",
      passwordConfirm:""
    })
    
    const [hidePassword, setHidePassword] = useState( true)
    const [error, setError] = useState( null)
    const [errorOpen, setErrorOpen] = useState( false)


  
  const handleClose = () => {
    setOpen(false);
  };

  const errorClose = e => {
    setErrorOpen(false)
  };

  
  const handleChange = e => {
    setUserParams(() => ({
      ...userParams,           // copy all other field/objects
        [e.target.getAttribute('name')]: e.target.value    // overwrite the value of the field to update
      
    }));
  };

  const passwordMatch = () => this.state.password === this.state.passwordConfirm;

  const showPassword = () => {
    setHidePassword(() => ({ hidePassword: !hidePassword }));
  };

  const isValid = () => {
    if (userParams.username === "") {
      return false;
    }
    return true;
  };
  
  const submitRegistration = e => {
    e.preventDefault();
    if (!passwordMatch()) {
        setErrorOpen(true);
        setError("Passwords don't match");
    }

    const newUserCredentials = {
      username: userParams.username,
      firstname:userParams.firstname,
      lastname:userParams.lastname,
      password: userParams.password //update to hash on later revision
    };
    window.alert("this.props.newUserCredentials", newUserCredentials);
    //dispath to userActions
  };

    return ( <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}>
      <div className="Registration">
        {/* <CssBaseline /> */}

        <Paper className="paper">
          <Avatar className="Avatar">
            <PeopleAltIcon className="icon" />
          </Avatar>
          <form
            className="form"
            onSubmit={submitRegistration}
          >
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="username" className="labels">
                username
              </InputLabel>
              <Input
                name="username"
                type="username"
                autoComplete="username"
                className="inputs"
                disableUnderline={true}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="firstname" className="labels">
                First Name
              </InputLabel>
              <Input
                name="firstname"
                type="firstname"
                autoComplete="firstname"
                className="inputs"
                disableUnderline={true}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="lastname" className="labels">
                Last Name
              </InputLabel>
              <Input
                name="lastname"
                type="lastname"
                autoComplete="lastname"
                className="inputs"
                disableUnderline={true}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password" className="labels">
                password
              </InputLabel>
              <Input
                name="password"
                autoComplete="password"
                className="inputs"
                disableUnderline={true}
                onChange={handleChange}
                type={hidePassword ? "password" : "input"}
                endAdornment={
                  hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffIcon
                        fontSize="default"
                        className="passwordEye"
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityIcon
                        fontSize="default"
                        className="passwordEye"
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="passwordConfirm" className="labels">
                Confirm password
              </InputLabel>
              <Input
                name="passwordConfirm"
                autoComplete="passwordConfirm"
                className="inputs"
                disableUnderline={true}
                onClick={showPassword}
                onChange={handleChange}
                type={hidePassword ? "password" : "input"}
                endAdornment={
                  hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffIcon
                        fontSize="default"
                        className="passwordEye"
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityIcon
                        fontSize="default"
                        className="passwordEye"
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <Button
              disabled={isValid()}
              disableRipple
              fullWidth
              variant="outlined"
              className="button"
              type="submit"
              onClick={submitRegistration}
            >
              Join
            </Button>
            <Button
            disableRipple
            fullWidth
            variant="outlined"
            className="button"
            type="submit"
            onClick={handleClose}
                >Cancel</Button>
          </form>

          {error ? (
            <Snackbar
              variant="error"
              key={error}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={errorOpen}
              onClose={errorClose}
              autoHideDuration={3000}
            >
              <SnackbarContent
                className="error"
                message={
                  <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                    <span> {error} </span>
                  </div>
                }
                action={[
                  <Icon
                    key="close"
                    aria-label="close"
                    onClick={errorClose}
                  >
                    <CloseIcon color="error" />
                  </Icon>
                ]}
              />
            </Snackbar>
          ) : null}
        </Paper>
      </div>
      </Modal>
    );
  }


export default Registration;
