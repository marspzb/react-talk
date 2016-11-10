import React from 'react';
import { connect } from 'react-redux';

class GameExplorerComponent extends React.Component {
    render() {
        return (
            <div class='game-explorer-component'>
                <ul></ul>
            </div>
        )
    }
}



const GameExplorer = connect(
    (state) => { return {} }
)(GameExplorerComponent)

export default GameExplorer
