import React from 'react'
import './Menu.css'

import Course from './Course'

class Menu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const courses = this.props.data.map(course => (
            <Course
                id={course.COURSEID}
                key={course.COURSEID}
                abbr={course.ABBR}
                title={course.TITLE}
                credits={course.CRECTS}
                school={course.SCHOOL}
                prereq={course.PREREQ}
                coreq={course.COREQ}
                antireq={course.ANTIREQ}
            />
        ))

        return (
            <div className="Menu">
                {courses}
            </div>
        )
    }
}

export default Menu