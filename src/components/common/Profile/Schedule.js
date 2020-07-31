import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";

import Alert from "../Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "react-loader-spinner";

const ScheduleProfileService = () => {
  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);

  const [name, setName] = useState("");
  const [pass, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [validating, setValidationStatus] = useState(false);

  const validateRegistrarCredentials = async (event) => {
    setValidationStatus(true);
    event.preventDefault();

    const uri =
      "https://us-central1-vatriume-5776b.cloudfunctions.net/validateRegistrarCredentials";

    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, pass }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          return result;
        },
        (error) => console.log("2", error)
      );

    if (response.status === "Passed") {
      firebase.updateProfile({ registrar: { name, pass, isValidated: true } });
      setValidated(true);
    } else {
      firebase.updateProfile({ registrar: { isValidated: false } });
      setValidated(false);
    }

    setValidationStatus(false);
  };

  useEffect(() => {
    if (profile.isLoaded && !profile.isEmpty)
      if (profile.registrar !== undefined)
        setValidated(profile.registrar.isValidated);
      else firebase.updateProfile({ registrar: { isValidated: false } });
  }, [profile]);

  return (
    <div className="services">
      <h1>Services:</h1>
      <div className="schedule">
        <h2>Schedule</h2>
        <h4>Registrar credentials</h4>
        <form onSubmit={validateRegistrarCredentials}>
          <label htmlFor="registrar-name">Username:</label>
          <br />
          <input
            type="text"
            name="registrar-name"
            id="registrar-name"
            placeholder="kirill.kirillov"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />

          <label htmlFor="registrar-password">Password:</label>
          <br />
          <input
            type="password"
            name="registrar-password"
            id="registrar-password"
            placeholder="•••••••••••••"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />

          <input
            className="btn btn-confirm"
            type="submit"
            name="registrar-submit"
            id="registrar-submit"
          />
        </form>
        {validating ? (
          <Loader
            type="Puff"
            color="var(--accent)"
            width="4rem"
            height="4rem"
            timeout={600000}
          />
        ) : validated && profile.isLoaded && !profile.isEmpty ? (
          <h5>
            <FontAwesomeIcon icon="check" /> Validated credentials for{" "}
            {profile.registrar.name}
          </h5>
        ) : (
          <h5>
            <FontAwesomeIcon icon="times" /> Not validated
          </h5>
        )}
      </div>
    </div>
  );
};

export default ScheduleProfileService;
