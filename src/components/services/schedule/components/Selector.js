import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Selector.css";
import "./Course.css";

const Selector = () => {
  const firebase = useFirebase();

  const coursesData = useSelector((state) => state.services.schedule.courses);
  const schedulesData = useSelector(
    (state) => state.services.schedule.schedules
  );
  const userData = useSelector((state) => state.firebase.profile.schedule);
  let chosenCoursesData = [];
  let chosenCoursesECTSData = 0;

  if (userData) {
    chosenCoursesData = userData.courses;
    chosenCoursesECTSData = userData.count;
  }

  let courses = coursesData.allIds;
  let schedules = schedulesData.allIds;

  const [searchQuery, setSearchQuery] = useState("");
  const [foundCourses, setFoundCourses] = useState(courses);
  const [chosenCourses, setChosenCourses] = useState(chosenCoursesData);
  const [ECTScounter, updateECTScounter] = useState(chosenCoursesECTSData);

  const chooseCourse = (chosen) => {
    setChosenCourses([...chosenCourses, chosen]);
    setFoundCourses((prev) => prev.filter((course) => course !== chosen));
    updateECTScounter(
      (prev) => prev + parseInt(coursesData.byId[chosen].CRECTS)
    );
  };

  const removeCourse = (chosen) => {
    setChosenCourses((prev) => prev.filter((course) => course !== chosen));
    setFoundCourses([chosen, ...foundCourses]);
    updateECTScounter(
      (prev) => prev - parseInt(coursesData.byId[chosen].CRECTS)
    );
  };

  useEffect(() => {
    setFoundCourses(
      courses
        .filter((course) =>
          coursesData.byId[course].ABBR.toLowerCase().includes(
            searchQuery.toLowerCase()
          )
        )
        .filter((course) => !chosenCourses.includes(course))
    );
  }, [searchQuery, chosenCourses]);

  const foundCourseComponents = foundCourses.map((c) => {
    const course = coursesData.byId[c];
    const sections = schedulesData.byId[c];
    return (
      <div key={course.INSTANCEID} className="Course">
        <h4>{course.ABBR}</h4>
        <p>{course.CRECTS} ECTS Credits</p>
        <small>{course.SCHOOL}</small>
        <button
          id={course.INSTANCEID}
          onClick={(e) => chooseCourse(e.currentTarget.id)}
        >
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
    );
  });

  const chosenCourseComponents = chosenCourses.map((c) => {
    const course = coursesData.byId[c];
    return (
      <div key={course.INSTANCEID} className="Course">
        <h4>{course.ABBR}</h4>
        <p>{course.CRECTS} ECTS Credits</p>
        <small>{course.SCHOOL}</small>
        <button
          id={course.INSTANCEID}
          onClick={(e) => removeCourse(e.currentTarget.id)}
        >
          <FontAwesomeIcon icon="times" />
        </button>
      </div>
    );
  });

  return (
    <div className="Selector">
      <div className="chosen">
        <button
          className="btn-confirm"
          id="save-chosen-courses"
          onClick={(e) => {
            e.preventDefault();

            if (ECTScounter >= 24 && ECTScounter <= 36) {
              firebase.updateProfile({
                schedule: { courses: chosenCourses, count: ECTScounter },
              });
            } else {
              alert(
                "Number of ECTS credits for one semester should be between 24 and 36"
              );
            }
          }}
        >
          Save
        </button>
        {chosenCourseComponents}
        <span>{ECTScounter}/36 ECTS Credits</span>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          name="available-courses"
          id="available-courses"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="available-courses">{foundCourseComponents}</div>
      </div>
    </div>
  );
};

export default Selector;
