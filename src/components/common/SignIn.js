import React from "react";

import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignIn.css";

const SignIn = () => {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "redirect",
      })
      .then(() => {
        if (!auth.isEmpty) firebase.updateProfile({ role: "admin" });
      });
  };

  return (
    <>
      <button
        className="SignIn"
        onClick={(e) => {
          e.preventDefault();

          if (auth.isLoaded && auth.isEmpty) {
            signInWithGoogle();
          } else {
            firebase.logout();
          }
        }}
      >
        {auth.isEmpty ? (
          <FontAwesomeIcon icon="plus" />
        ) : (
          <img src={auth.photoURL} alt="avatar" />
        )}
      </button>
    </>
  );
};

export default SignIn;
