import React from 'react'
import './Schedule.css'

import Menu from './components/Menu'
import Timetable from './components/Timetable'
import Info from './components/Info'
class Schedule extends React.Component {
    render() {
        return (
            <div className="Schedule">
                <Menu data={this.props.data} />
                <Timetable data={this.props.data} />
                <Info data={this.props.data} />
            </div>
        )
    }
}

export default Schedule