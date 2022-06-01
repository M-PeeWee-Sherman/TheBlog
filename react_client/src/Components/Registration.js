//https://codesandbox.io/s/signupregistration-form-reactmaterialui-fr71m?file=/src/components/Registration.jsx:0-7111
import React, { Component } from "react";
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

class Registration extends Component {
  state = {
    username: "",
    firstname:"",
    lastname:"",
    password: "",
    passwordConfirm: "",
    hidePassword: true,
    error: null,
    errorOpen: false,
    open: false
  };

  
  handleClose = () => {
    this.props.setOpen(false)
  };

  errorClose = e => {
    this.setState({
      errorOpen: false
    });
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  passwordMatch = () => this.state.password === this.state.passwordConfirm;

  showPassword = () => {
    this.setState(prevState => ({ hidePassword: !prevState.hidePassword }));
  };

  isValid = () => {
    if (this.state.email === "") {
      return false;
    }
    return true;
  };
  
  submitRegistration = e => {
    e.preventDefault();
    if (!this.passwordMatch()) {
      this.setState({
        errorOpen: true,
        error: "Passwords don't match"
      });
    }
    const newUserCredentials = {
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    };
    console.log("this.props.newUserCredentials", newUserCredentials);
    //dispath to userActions
  };

  render() {
    const { classes } = this.props;
    return ( <Modal
        hideBackdrop
        open={this.props.open}
        onClose={this.handleClose}>
      <div className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PeopleAltIcon className={classes.icon} />
          </Avatar>
          <form
            className={classes.form}
            onSubmit={() => this.submitRegistration}
          >
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="username" className={classes.labels}>
                username
              </InputLabel>
              <Input
                name="username"
                type="username"
                autoComplete="username"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("username")}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="firstname" className={classes.labels}>
                First Name
              </InputLabel>
              <Input
                name="firstname"
                type="firstname"
                autoComplete="firstname"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("firstname")}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="lastname" className={classes.labels}>
                Last Name
              </InputLabel>
              <Input
                name="lastname"
                type="lastname"
                autoComplete="lastname"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("lastname")}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password" className={classes.labels}>
                password
              </InputLabel>
              <Input
                name="password"
                autoComplete="password"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("password")}
                type={this.state.hidePassword ? "password" : "input"}
                endAdornment={
                  this.state.hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="passwordConfirm" className={classes.labels}>
                Confirm password
              </InputLabel>
              <Input
                name="passwordConfirm"
                autoComplete="passwordConfirm"
                className={classes.inputs}
                disableUnderline={true}
                onClick={this.state.showPassword}
                onChange={this.handleChange("passwordConfirm")}
                type={this.state.hidePassword ? "password" : "input"}
                endAdornment={
                  this.state.hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <Button
              disabled={!this.isValid()}
              disableRipple
              fullWidth
              variant="outlined"
              className={classes.button}
              type="submit"
              onClick={this.submitRegistration}
            >
              Join
            </Button>
            <Button
            disableRipple
            fullWidth
            variant="outlined"
            className={classes.button}
            type="submit"
            onClick={this.handleClose}
                >Cancel</Button>
          </form>

          {this.state.error ? (
            <Snackbar
              variant="error"
              key={this.state.error}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={this.state.errorOpen}
              onClose={this.errorClose}
              autoHideDuration={3000}
            >
              <SnackbarContent
                className={classes.error}
                message={
                  <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                    <span> {this.state.error} </span>
                  </div>
                }
                action={[
                  <Icon
                    key="close"
                    aria-label="close"
                    onClick={this.errorClose}
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
}

export default Registration;
