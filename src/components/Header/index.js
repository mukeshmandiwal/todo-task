import React from "react";
import styled from "styled-components";

const SignOutButton = React.lazy(() => import("../Auth/SignOut"));
const Layout = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #fff;
`;

const TaskHeading = styled.div`
  color: #50e3a4;
  font-weight: 600;
  font-size: 36px;
  display: flex;
  justify-content: center;
  padding: 15px;
`;
const LogoutWrapper = styled.div`
  position: absolute;
  border-radius: 50%;
  display: flex;
  right: 1%;
  padding: 10px;
  cursor: pointer;
  background: #f2f2f2;
  justify-content: center;
  &:hover {
    background: rgba(128, 128, 128, 0.7);
  }
`;

const Header = () => {
  return (
    <Layout>
      <TaskHeading>Todo task</TaskHeading>
      <LogoutWrapper>
        <SignOutButton />
      </LogoutWrapper>
    </Layout>
  );
};

export { Header as default };
