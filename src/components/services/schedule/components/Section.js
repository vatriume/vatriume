import React from "react";
import { useDrag } from "react-dnd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/Section.css";

import { ItemTypes } from "../Schedule";

const Section = (props) => {
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.SECTION,
            sectionType: props.id,
            sections: props.sections,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // TODO: update the dictionary
    const dictionary = {
        L: "Lecture",
        T: "Tutorial",
        Lb: "Lab",
        PLb: "PhysLab",
        BLb: "BioLab",
        ChLb: "ChemLab",
        CLb: "CompLab",
        S: "Seminar",
        R: "Recitation",
        IS: "IS",
        P: "P",
        Wsh: "Wsh",
        CP: "CP",
    };

    return (
        <div
            className="Section"
            id={props.id}
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1.0,
            }}
        >
            <p>{dictionary[props.id]}</p>
        </div>
    );
};

export default Section;
