import firebase from "../../firebase";
import "firebase/firestore";

import * as actions from "../common/database";

const database = ({ dispatch }) => (next) => async (action) => {
  if (
    action.type !== actions.databaseFetch.type &&
    action.type !== actions.databaseUpdate.type
  )
    return next(action);

  const db = firebase.firestore();
  const { request, onSuccess, onFailure } = action.payload;

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
