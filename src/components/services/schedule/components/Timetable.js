import React from "react";
import { useSelector } from "react-redux";
import "./styles/Timetable.css";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../Schedule";

import SectionTime from "./SectionTime";

const Timetable = ({ daysNum }) => {
    // Connecting React DnD
    const [{ sectionDragged }] = useDrop({
        accept: ItemTypes.SECTION,
        collect: (monitor) => ({
            sectionDragged: monitor.getItem(),
        }),
    });

    const chosenSections = useSelector(
        (state) => state.firebase.profile.schedule.sections
    );
    const coursesData = useSelector((state) => state.services.schedule.courses);

    // Basic markup
    let dayNames = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let timestamps = [];
    let days = [];

    for (let i = 9; i <= 20; i++) {
        timestamps.push(
            <div key={i + ":00"} id={i + ":00"}>
                {i + ":00"}
            </div>
        );
    }

    for (let i = 0; i < daysNum; i++) {
        days.push(
            <div
                key={dayNames[i]}
                id={dayNames[i]}
                style={{
                    flex: "0 0 calc(100% / " + daysNum + ")",
                }}
            >
                <h3>{dayNames[i]}</h3>
            </div>
        );
    }

    // Drag render functions
    const renderPossible = (sections) => {
        let possibleTimes = [];

        for (const section of sections) {
            const course = section.INSTANCEID;

            if (!timeClash(section, renderChosen(chosenSections)))
                possibleTimes.push(
                    <SectionTime
                        display="available"
                        daysNum={daysNum}
                        course={coursesData.byId[course].ABBR}
                        section={section}
                    ></SectionTime>
                );
        }

        return possibleTimes;
    };

    const renderChosen = (sections) => {
        let chosenTimes = [];
        Object.keys(sections).forEach((course) => {
            const n = Object.keys(sections[course]).map((sectionType) => (
                <SectionTime
                    display="chosen"
                    key={
                        coursesData.byId[course].INSTANCEID +
                        "-" +
                        sections[course][sectionType].ST
                    }
                    daysNum={daysNum}
                    course={coursesData.byId[course].ABBR}
                    section={sections[course][sectionType]}
                ></SectionTime>
            ));
            chosenTimes = [...chosenTimes, ...n];
        });

        return chosenTimes;
    };

    // Returns true if there is a time clash
    const timeClash = (section, chosenSections) => {
        let result = false;

        for (const chosen of chosenSections) {
            // Checking if there is at least one common day
            const chosenDays = chosen.props.section["DAYS"]
                .replace(/ /g, "")
                .split("");
            const days = section["DAYS"].replace(/ /g, "").split("");
            let haveSameDay = false;

            for (const day of days) {
                if (chosenDays.includes(day)) {
                    haveSameDay = true;
                }
            }

            // If there are no common days, there is no need to check the times
            if (!haveSameDay) continue;

            // Checking if there is actually a time clash
            const chosenTimes = chosen.props.section["FORMATTED TIMES"];
            const times = section["FORMATTED TIMES"];

            if (times[0] >= chosenTimes[0] && times[0] <= chosenTimes[1])
                result = true;
            if (times[1] >= chosenTimes[0] && times[1] <= chosenTimes[1])
                result = true;
            if (times[0] <= chosenTimes[0] && times[1] >= chosenTimes[1])
                result = true;

            if (result) return true;
        }

        return false;
    };

    return (
        <div className="Timetable panel">
            <div className="table">
                <div className="timestamps">{timestamps}</div>
                <div className="right">
                    <div className="days" style={{}}>
                        {days}
                    </div>
                    <div className="fields">
                        {sectionDragged &&
                            sectionDragged.type === ItemTypes.SECTION &&
                            renderPossible(sectionDragged.sections)}
                        {chosenSections && renderChosen(chosenSections)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timetable;
