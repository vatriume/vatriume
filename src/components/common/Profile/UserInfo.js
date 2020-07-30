import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

const UserInfo = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const auth = useSelector((state) => state.firebase.auth);

  const avatar = useSelector((state) => state.firebase.profile.avatarUrl);
  const username = useSelector((state) => state.firebase.profile.displayName);
  const role = useSelector((state) => state.firebase.profile.role);

  return (
    <div className="user-info">
      <img src={avatar} alt="avatar" />
      <h1>{username}</h1>
      <span
        className={
          role === "NU Member"
            ? "nu-member"
            : role === "Supporter"
            ? "supporter"
            : role === "Admin"
            ? "admin"
            : null
        }
      >
        {role}
      </span>
      <button
        className="btn btn-error"
        onClick={(e) => {
          e.preventDefault();

          if (auth.isLoaded && !auth.isEmpty) {
            firebase.logout();
            history.push("/");
          } else {
            history.push("/");
          }
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserInfo;
