import React, { Component } from 'react'

class RunGameBtn extends Component {
    render() {
        return (
            <button className="run-game-btn" onClick={this.props.callback}>
                Run game
            </button>
        );
    }
}

export default RunGameBtn;