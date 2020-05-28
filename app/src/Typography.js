import React from 'react'

class Typography extends React.Component {
    render() {
        return (
            <div>
                <h1 style={{ display: "block" }}>H1    The quick brown fox jumps over the lazy dog</h1>
                <br />
                <h2 style={{display: "block"}}>H2    The quick brown fox jumps over the lazy dog</h2>
                <br />
                <h3 style={{display: "block"}}>H3    The quick brown fox jumps over the lazy dog</h3>
                <br />
                <h4 style={{display: "block"}}>H4    The quick brown fox jumps over the lazy dog</h4>
                <br />
                <p style={{display: "block"}}>p    The quick brown fox jumps over the lazy dog</p>
                <br />
                <small style={{display: "block"}}>small    The quick brown fox jumps over the lazy dog</small>
                <br />
                <code style={{display: "block"}}>code    The quick brown fox jumps over the lazy dog</code>
                <br />
            </div>
        )
    }
}

export default Typography