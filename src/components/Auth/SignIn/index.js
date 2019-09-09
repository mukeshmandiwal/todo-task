import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import styled from "styled-components";
import { SignUpLink } from "../SignUp";
import SignInButton from "./SignInButton";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../../constants/routes";

const PageLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FromLayout = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FromInput = styled.input`
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #f2f2f2;
`;

const SignInFormUI = styled.div`
  display: flex;
  width: 30%;
  color: #999999;
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.1);
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  flex-direction: column;
`;

const FormLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 10px;
  padding: 5px;
`;

const TaskHeading = styled.div`
  color: #50e3a4;
  font-weight: 600;
  font-size: 36px;
  display: flex;
  justify-content: center;
  padding: 15px;
`;

const SubmitButton = styled.button`
  color: gray;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  width: 100px;
  border-radius: 2px;
  margin: 10px;
  border: 1px solid rgba(3, 168, 124, 1);
  justify-content: center;
  padding: 8px;
  &:hover {
    background: rgba(3, 168, 124, 1);
    color: #fff;
  }
  ::placeholder {
    color: #f2f2f2;
  }
`;

const SignInPage = () => (
  <PageLayout>
    <FromLayout>
      <TaskHeading>Todo task</TaskHeading>
      <SignInForm />
      <SignInGoogle />
      <PasswordForgetLink />
      <SignUpLink />
    </FromLayout>
  </PageLayout>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
        <FormLayout>
          <SignInFormUI>
            <FromInput
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <FromInput
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </SignInFormUI>
          <SubmitButton disabled={isInvalid} type="submit">
            Sign In
          </SubmitButton>
          {error && <ErrorMsg>{error.message}</ErrorMsg>}
        </FormLayout>
      </form>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {}
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <SignInButton></SignInButton>
        {error && <ErrorMsg>{error.message}</ErrorMsg>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase);

export default SignInPage;
export { SignInForm, SignInGoogle };
