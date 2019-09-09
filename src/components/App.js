import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { withAuthentication } from "./Auth/Session";
import Loader from "assets/task.png";
import styled from "styled-components";
const SignUpPage = React.lazy(() => import("./Auth/SignUp"));
const SignInPage = React.lazy(() => import("./Auth/SignIn"));
const PasswordForgetPage = React.lazy(() => import("./Auth/PasswordForget"));
const HomePage = React.lazy(() => import("./Home"));

const ImageSrc = styled.img`
  width: 140px;
  height: 140px;
`;
const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const App = () => {
  function LoaderPng() {
    return (
      <PageLayout>
        <ImageSrc src={Loader} />;
      </PageLayout>
    );
  }
  return (
    <Router>
      <React.Fragment>
        <React.Suspense fallback={LoaderPng()}>
          <Route exact path="/" render={props => <SignInPage {...props} />} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
        </React.Suspense>
      </React.Fragment>
    </Router>
  );
};

export default withAuthentication(App);
