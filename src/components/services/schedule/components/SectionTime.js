import React from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

import { ItemTypes } from "../Schedule";

import "./styles/SectionTime.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SectionTime = ({ course, section, display }) => {
  // Connecting Firebase user profile
  const firebase = useFirebase();

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

  let sectionTime = [];

  for (const day of days) {
    const ID = section.INSTANCEID + "-" + section.ST + "-" + day;
    const style = {
      position: "absolute",
      top:
        "calc(100% / 12 * " + (section["FORMATTED TIMES"][0] - 540) / 60 + ")",
      left: "calc(100% / 6 * " + d.indexOf(day) + ")",
      width: "calc(100% / 6)",
      height:
        "calc(100% / 12 * " +
        (section["FORMATTED TIMES"][1] - section["FORMATTED TIMES"][0]) / 60 +
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
        <button
          id={ID}
          onClick={(e) => {
            e.preventDefault();

            const sectionType = section.ST.replace(/[0-9]/g, "");

            const {
              [sectionType]: old,
              ...newChosenSections
            } = userProfile.schedule.sections[section["INSTANCEID"]];

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
                  [section["INSTANCEID"]]: { ...newChosenSections },
                },
              },
            });
          }}
        >
          <FontAwesomeIcon icon="times" />
        </button>
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
