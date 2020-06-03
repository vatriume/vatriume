import firebase from "firebase/app";
import "firebase/firestore";

import React, { useState, useEffect } from "react";
import "./Schedule.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Menu from "./components/Menu";
import Timetable from "./components/Timetable";
import Info from "./components/Info";

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

// Setting some variables for convenience
const db = firebase.firestore();
const coursesCollection = db
  .collection("schedule")
  .doc("courseData")
  .collection("courses");
const schedulesCollection = db
  .collection("schedule")
  .doc("courseData")
  .collection("schedules");

// Schedule Component
const Schedule = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [schedulesData, setSchedulesData] = useState([]);

  useEffect(() => {
    const getCoursesData = async () => {
      await coursesCollection
        .get()
        .then((querySnapshot) => {
          let allDocs = [];
          querySnapshot.forEach((doc) => allDocs.push(doc.data()));
          setCoursesData(allDocs);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const getSchedulesData = async () => {
      await schedulesCollection
        .get()
        .then((querySnapshot) => {
          let allDocs = [];
          querySnapshot.forEach((doc) => allDocs.push(doc.data()));
          setSchedulesData(allDocs);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    getCoursesData();
    getSchedulesData();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="Schedule">
        <Menu coursesData={coursesData} />
        <Timetable coursesData={coursesData} schedulesData={schedulesData} />
        <Info coursesData={coursesData} schedulesData={schedulesData} />
      </div>
    </DndProvider>
  );
};

export default Schedule;
export const ItemTypes = {
  SECTION: "section",
};
