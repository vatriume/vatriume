import React from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

import { ItemTypes } from "../Schedule";

import "./styles/SectionTime.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { current } from "@reduxjs/toolkit";

const SectionTime = ({ course, section, display, daysNum }) => {
    // Connecting Firebase user profile
    const firebase = useFirebase();

    // All schedules
    const schedulesData = useSelector(
        (state) => state.services.schedule.schedules
    );

    // Connecting React DnD
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.SECTION,
        canDrop: (item) => {
            const courseId = section["INSTANCEID"];
            const sectionType = section.ST.replace(/[0-9]/g, "");

            const itemCourseId = item.sections[0]["INSTANCEID"];
            const itemSectionType = item.sections[0].ST.replace(/[0-9]/g, "");

            if (itemCourseId === courseId && itemSectionType === sectionType)
                return true;
            else return false;
        },
        drop: (item) => {
            const instanceid = item.sections[0]["INSTANCEID"];
            const sectionType = item.sectionType;

            firebase.updateProfile({
                schedule: {
                    sections: {
                        [instanceid]: { [sectionType]: section },
                    },
                },
            });
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const userProfile = useSelector((state) => state.firebase.profile);
    const chosen = display === "chosen";
    const id = section.INSTANCEID + "-" + section.ST;
    const d = ["M", "T", "W", "R", "F", "S"];
    const days = section.DAYS.replace(/ /g, "").split("");

    const sectionType = section.ST.replace(/[0-9]/g, "");
    const instanceid = section.INSTANCEID;
    const allSections = schedulesData.byId[instanceid].SECTIONS[sectionType];

    const sameTimesSections = allSections.filter(
        (s) => s.TIMES === section.TIMES && s.DAYS === section.DAYS
    );

    let sectionTime = [];

    for (const day of days) {
        const ID = section.INSTANCEID + "-" + section.ST + "-" + day;
        const style = {
            position: "absolute",
            top:
                "calc(100% / 12 * " +
                (section["FORMATTED TIMES"][0] - 540) / 60 +
                ")",
            left: "calc(100% / " + daysNum + " * " + d.indexOf(day) + ")",
            width: "calc(100% / " + daysNum + ")",
            height:
                "calc(100% / 12 * " +
                (section["FORMATTED TIMES"][1] -
                    section["FORMATTED TIMES"][0]) /
                    60 +
                ")",
            backgroundColor: chosen
                ? "var(--accent)"
                : isOver
                ? "var(--accent)"
                : "var(--select-hover)",
        };

        sectionTime.push(
            <div key={ID} id={ID} style={style}>
                <h5>{course + " " + section["ST"]}</h5>
                <p>{section["TIMES"]}</p>
                <p>{section["FACULTY"]}</p>
                {display === "chosen" ? (
                    <>
                        <button
                            id={ID}
                            className="section-delete"
                            onClick={(e) => {
                                e.preventDefault();

                                const sectionType = section.ST.replace(
                                    /[0-9]/g,
                                    ""
                                );

                                const {
                                    [sectionType]: old,
                                    ...newChosenSections
                                } =
                                    userProfile.schedule.sections[
                                        section["INSTANCEID"]
                                    ];

                                firebase.updateProfile({
                                    schedule: {
                                        sections: {
                                            [section["INSTANCEID"]]: {},
                                        },
                                    },
                                });

                                firebase.updateProfile({
                                    schedule: {
                                        sections: {
                                            [section["INSTANCEID"]]: {
                                                ...newChosenSections,
                                            },
                                        },
                                    },
                                });
                            }}
                        >
                            <FontAwesomeIcon icon="times" />
                        </button>
                        {sameTimesSections.length !== 1 ? (
                            <button
                                id={ID}
                                className="section-rotate"
                                onClick={(e) => {
                                    e.preventDefault();

                                    let currentlyChosenIndex = -1;
                                    let nextIndex = -1;

                                    if (sameTimesSections.length !== 1) {
                                        currentlyChosenIndex =
                                            sameTimesSections.indexOf(
                                                sameTimesSections.find(
                                                    (s) => s.ST === section.ST
                                                )
                                            );
                                        nextIndex =
                                            (currentlyChosenIndex + 1) %
                                            sameTimesSections.length;
                                    }

                                    if (nextIndex !== -1)
                                        firebase.updateProfile({
                                            schedule: {
                                                sections: {
                                                    [instanceid]: {
                                                        [sectionType]:
                                                            sameTimesSections[
                                                                nextIndex
                                                            ],
                                                    },
                                                },
                                            },
                                        });
                                }}
                            >
                                <FontAwesomeIcon icon="sync-alt" />
                            </button>
                        ) : (
                            ""
                        )}
                    </>
                ) : (
                    ""
                )}
            </div>
        );
    }

    return (
        <div id={id} key={id} ref={drop} className="section-display">
            {sectionTime}
        </div>
    );
};

export default SectionTime;
