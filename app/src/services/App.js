import react from 'react'
import reactDOM from 'react-dom'

import courses from '../public/courses.json'

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            data: courses
        }
    }

    render() {
        return (
            <h1>Hello, World!</h1>
        )
    }
}