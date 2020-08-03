import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import "./Profile.css";
import ScheduleProfileService from "./Schedule";
import UserInfo from "./UserInfo";
import Loader from "react-loader-spinner";

const Profile = () => {
  const firebase = useFirebase();
  const history = useHistory();
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

  useEffect(() => {
    if (profile.isLoaded && !profile.isEmpty) {
      if (profile.role === undefined) {
        let role = "User";

        if (profile.email.includes("@nu.edu.kz")) role = "NU Member";

        firebase.updateProfile({
          role: role,
        });
      }
    }
  }, [profile]);

  return (
    <div className="Profile">
      {profile.isLoaded ? (
        !profile.isEmpty ? (
          <>
            <UserInfo />
            <ScheduleProfileService />
          </>
        ) : (
          signInWithGoogle()
        )
      ) : (
        <div className="loader">
          <Loader
            type="Puff"
            color="var(--accent)"
            width="4rem"
            height="4rem"
            timeout={600000}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
