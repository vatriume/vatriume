import React from 'react'
import './Course.css'

class Course extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="Course">
                <h4>{this.props.abbr}</h4>
                <p>{this.props.credits} ECTS Credits</p>
                <small>{this.props.school}</small>
            </div>
        )
    }
}

export default Course