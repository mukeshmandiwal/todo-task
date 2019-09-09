import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import styled from "styled-components";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../../constants/routes";
const NewLink = styled.div`
  padding: 10px;
  color: #50e3a4;
`;

const PageLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const FormLayout = styled.div`
  height: 100%;
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
const SignUpPage = () => (
  <PageLayout>
    <TaskHeading>SignUp</TaskHeading>
    <SignUpForm />
  </PageLayout>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  error: null
};

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
        <FormLayout>
          <SignInFormUI>
            <FromInput
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Full Name"
            />
            <FromInput
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <FromInput
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <FromInput
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
          </SignInFormUI>
          <SubmitButton disabled={isInvalid} type="submit">
            Sign Up
          </SubmitButton>
          {error && <ErrorMsg>{error.message}</ErrorMsg>}
        </FormLayout>
      </form>
    );
  }
}

const SignUpLink = () => (
  <NewLink>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </NewLink>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
