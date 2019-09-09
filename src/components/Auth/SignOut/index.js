import React from "react";
import { LogoutIcon } from "shared/Icons";
import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <LogoutIcon onClick={firebase.doSignOut}>Sign Out</LogoutIcon>
);

export default withFirebase(SignOutButton);
