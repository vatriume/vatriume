import React from 'react'

import logo from './logo.svg'
import './App.css'
import courses from './courses.json'

import Schedule from './services/schedule/Schedule'
import Sidebar from './Sidebar'
import Typography from './Typography'

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            data: courses.data
        }
    }

    render() {
        return (
            <div className="App">
                <Sidebar logo={logo} />
                <Typography />
                <Schedule data={this.state.data} />
            </div>
        )
    }
}

export default App
