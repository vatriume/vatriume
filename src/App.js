import React from 'react'

// Assets and data
import logo from './logo.svg'
import './App.css'
import courses from './services/schedule/courses.json'

// Components
import Sidebar from './common/Sidebar'
import Typography from './common/Typography'
import Schedule from './services/schedule/Schedule'

// FontAwesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
library.add(faSun, faMoon)

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
                {console.log(this.state.data)}
                <Sidebar logo={logo} />
                <Schedule data={this.state.data} />
            </div>
        )
    }
}

export default App
