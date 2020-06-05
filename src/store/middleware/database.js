import firebase from "firebase/app";
import "firebase/firestore";

import * as actions from "../database";

// Initializing the app with config so that the app could access data
const firebaseConfig = {
  apiKey: "AIzaSyBkiiqYOy7eJ0VTXwrtvd8Dmql2B8pUcM4",
  authDomain: "vatriume-5776b.firebaseapp.com",
  databaseURL: "https://vatriume-5776b.firebaseio.com",
  projectId: "vatriume-5776b",
  storageBucket: "vatriume-5776b.appspot.com",
  messagingSenderId: "231019453074",
  appId: "1:231019453074:web:4161ca0f6b8cc5586a644b",
  measurementId: "G-3W27Y10HZD",
};
firebase.initializeApp(firebaseConfig);

const database = ({ dispatch }) => (next) => async (action) => {
  const db = firebase.firestore();
  const { request, onSuccess, onFailure } = action.payload;

  if (
    action.type !== actions.databaseFetch.type &&
    action.type !== actions.databaseUpdate.type
  )
    return next(action);

  next(action);

  if (action.type === actions.databaseFetch.type) {
    if (request === "services/schedule/courses") {
      const coursesCollection = db
        .collection("services")
        .doc("schedule")
        .collection("courses");

      await coursesCollection
        .get()
        .then((querySnapshot) => {
          let courses = {};
          querySnapshot.forEach((doc) => {
            courses[doc.data().INSTANCEID] = doc.data();
          });
          dispatch({ type: onSuccess, payload: courses });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: onFailure, payload: err });
        });
    } else if (request === "services/schedule/schedules") {
      const schedulesCollection = db
        .collection("services")
        .doc("schedule")
        .collection("schedules");

      await schedulesCollection
        .get()
        .then((querySnapshot) => {
          let schedules = {};
          querySnapshot.forEach((doc) => {
            schedules[doc.data().INSTANCEID] = doc.data();
          });
          dispatch({ type: onSuccess, payload: schedules });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: onFailure, payload: err });
        });
    }
  }
};

export default database;
