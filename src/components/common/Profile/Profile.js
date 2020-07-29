import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

import "./Profile.css";
import ScheduleProfileService from "./Schedule";
import UserInfo from "./UserInfo";

const Profile = () => {
  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);

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

  return profile.isLoaded ? (
    <div className="Profile">
      <UserInfo />
      <ScheduleProfileService />
    </div>
  ) : (
    <div className="loader"></div>
  );
};

export default Profile;
