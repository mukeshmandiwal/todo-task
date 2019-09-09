import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../../constants/routes";
const PasswordLink = styled.div`
  padding: 10px;
`;

const PageLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FormLayout = styled.div`
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
const PasswordForgetPage = () => (
  <PageLayout>
    <TaskHeading>PasswordForget</TaskHeading>
    <PasswordForgetForm />
  </PageLayout>
);

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;
    const isInvalid = email === "";
    return (
      <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
        <FormLayout>
          <SignInFormUI>
            <FromInput
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </SignInFormUI>
          <SubmitButton disabled={isInvalid} type="submit">
            Reset My Password
          </SubmitButton>
          {error && <ErrorMsg>{error.message}</ErrorMsg>}
        </FormLayout>
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <PasswordLink>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </PasswordLink>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
