import React from "react";

import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignIn.css";

const SignIn = () => {
  const firebase = useFirebase();
  const authorized = !useSelector((state) => state.firebase.auth.isEmpty);

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "redirect",
      })
      .then(() => {
        console.log("successful");
      });
  };

  return (
    <>
      <button
        className="SignIn"
        onClick={(e) => {
          e.preventDefault();

          if (authorized) {
            signInWithGoogle();
          } else {
            firebase.logout();
          }
        }}
      >
        <FontAwesomeIcon icon="plus" />
      </button>
    </>
  );
};

export default SignIn;
