import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/Selector.css";
import "./styles/Course.css";

const Selector = () => {
    const firebase = useFirebase();
    const history = useHistory();
    const profile = useSelector((state) => state.firebase.profile);

    const coursesData = useSelector((state) => state.services.schedule.courses);
    const schedulesData = useSelector(
        (state) => state.services.schedule.schedules
    );

    let courses = coursesData.allIds;

    const [searchQuery, setSearchQuery] = useState("");
    const [daysNum, updateDaysNum] = useState(5);
    const [chosenCoursesWithSaturday, updateChosenCoursesWithSaturday] =
        useState([]);
    const [foundCourses, setFoundCourses] = useState(courses);
    const [chosenCourses, setChosenCourses] = useState([]);
    const [ECTScounter, updateECTScounter] = useState(0);

    const chooseCourse = (chosen) => {
        const newChosenCourses = [...chosenCourses, chosen];
        const newFoundCourses = foundCourses.filter(
            (course) => course !== chosen
        );
        const newECTSCounter =
            ECTScounter + parseInt(coursesData.byId[chosen].CRECTS);
        const hasSaturday = checkForSaturday(chosen);
        const newChosenCoursesWithSaturday = hasSaturday
            ? [...chosenCoursesWithSaturday, chosen]
            : chosenCoursesWithSaturday;
        const newDaysNum = newChosenCoursesWithSaturday.length === 0 ? 5 : 6;

        setChosenCourses(newChosenCourses);
        setFoundCourses(newFoundCourses);
        updateECTScounter(newECTSCounter);
        updateDaysNum(newDaysNum);
        updateChosenCoursesWithSaturday(newChosenCoursesWithSaturday);

        firebase.updateProfile({
            schedule: {
                courses: newChosenCourses,
                daysNum: newDaysNum,
                count: newECTSCounter,
            },
        });
    };

    const checkForSaturday = (instanceid) => {
        const sections = Object.keys(schedulesData.byId[instanceid].SECTIONS);

        for (const section of sections)
            for (const time of schedulesData.byId[instanceid].SECTIONS[section])
                if (time.DAYS.includes("S")) return true;

        return false;
    };

    const removeCourse = (chosen) => {
        const newChosenCourses = chosenCourses.filter(
            (course) => course !== chosen
        );
        const newFoundCourses = [chosen, ...foundCourses];
        const newECTSCounter =
            ECTScounter - parseInt(coursesData.byId[chosen].CRECTS);
        const newChosenCoursesWithSaturday = chosenCoursesWithSaturday.filter(
            (course) => course !== chosen
        );
        const newDaysNum = newChosenCoursesWithSaturday.length === 0 ? 5 : 6;

        setChosenCourses(newChosenCourses);
        setFoundCourses(newFoundCourses);
        updateECTScounter(newECTSCounter);
        updateDaysNum(newDaysNum);
        updateChosenCoursesWithSaturday(newChosenCoursesWithSaturday);

        firebase.updateProfile({
            schedule: {
                courses: newChosenCourses,
                sections: { [chosen]: {} },
                daysNum: newDaysNum,
                count: newECTSCounter,
            },
        });
    };

    const search = (searchQuery, chosenCourses) => {
        setFoundCourses(
            courses
                .filter(
                    (course) =>
                        coursesData.byId[course].ABBR.toLowerCase().includes(
                            searchQuery.toLowerCase()
                        ) ||
                        coursesData.byId[course].TITLE.toLowerCase().includes(
                            searchQuery.toLowerCase()
                        )
                )
                .filter((course) => !chosenCourses.includes(course))
        );
    };

    useEffect(() => {
        setFoundCourses(
            courses
                .filter(
                    (course) =>
                        coursesData.byId[course].ABBR.toLowerCase().includes(
                            searchQuery.toLowerCase()
                        ) ||
                        coursesData.byId[course].TITLE.toLowerCase().includes(
                            searchQuery.toLowerCase()
                        )
                )
                .filter((course) => !chosenCourses.includes(course))
        );
    }, [chosenCourses]);

    useEffect(() => {
        if (profile.isLoaded && !profile.isEmpty && profile.schedule) {
            setChosenCourses(profile.schedule.courses);
            updateECTScounter(profile.schedule.count);
        }
    }, [profile]);

    const foundCourseComponents = foundCourses.map((c) => {
        const course = coursesData.byId[c];
        return (
            <div key={course.INSTANCEID} className="Course">
                <h4>{course.ABBR}</h4>
                <p>{course.TITLE}</p>
                <small>{course.CRECTS} ECTS Credits</small>
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
                <p>{course.TITLE}</p>
                <small>{course.CRECTS} ECTS Credits</small>
                <button
                    id={course.INSTANCEID}
                    onClick={(e) => {
                        removeCourse(e.currentTarget.id);
                    }}
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
                    className="btn btn-confirm"
                    id="save-chosen-courses"
                    onClick={(e) => {
                        e.preventDefault();

                        history.push("/schedule");
                    }}
                >
                    Save
                </button>
                <span>{ECTScounter}/36 ECTS</span>
                <div className="chosen-courses">
                    {profile.isLoaded && !profile.isEmpty ? (
                        chosenCourseComponents
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
            </div>
            <div className="panel search">
                <input
                    type="text"
                    placeholder="Search..."
                    name="available-courses"
                    id="available-courses"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.which === 13) search(searchQuery, chosenCourses);
                    }}
                />
                <button
                    className="btn btn-common"
                    onClick={() => search(searchQuery, chosenCourses)}
                >
                    Search
                </button>
                <div className="available-courses">{foundCourseComponents}</div>
            </div>
        </div>
    );
};

export default Selector;
