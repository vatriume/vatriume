import firebase from "firebase/app";
import "firebase/firestore";

import React from "react";
import "./Schedule.css";

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

// Setting that forces the WEB client to load data from server each
// time the page loads
const getOptions = { source: "server" };

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coursesData: null,
      schedulesData: null,
    };
  }

  componentDidMount() {
    coursesCollection
      .get(getOptions)
      .then((querySnapshot) => {
        let allDocs = [];
        querySnapshot.forEach((doc) => allDocs.push(doc.data()));
        this.setState({ coursesData: allDocs });
      })
      .catch((err) => {
        console.error(err);
      });

    schedulesCollection
      .get(getOptions)
      .then((querySnapshot) => {
        let allDocs = [];
        querySnapshot.forEach((doc) => allDocs.push(doc.data()));
        this.setState({ schedulesData: allDocs });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="Schedule">
        <Menu coursesData={this.state.coursesData} />
        <Timetable coursesData={this.state.coursesData} />
        <Info coursesData={this.state.coursesData} />
      </div>
    );
  }
}

export default Schedule;
