import React from "react";

import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignIn.css";

const SignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/profile");
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
            history.push("/profile");
          }
        }}
      >
        {auth.isEmpty ? (
          <FontAwesomeIcon color="var(--text)" icon="user" />
        ) : (
          <img src={auth.photoURL} alt="avatar" />
        )}
      </button>
    </>
  );
};

export default SignIn;
