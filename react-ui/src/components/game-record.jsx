import React from 'react';
import { connect } from 'react-redux';

class GameRecordComponent extends React.Component {
    render() {
        var moves = this.props.board.moves;
        var recordElements = [];

        for (var i = 0; i < moves.length; i += 2) {
            var content = (Math.floor(i / 2) + 1) + ".";
            content += ' ' + moves[i].notation;
            if (i + 1 < moves.length) {
                content += ' ' + moves[i + 1].notation;
            }
            recordElements.push(<li>
                {content}
            </li>);
        }
        return (
            <div className='game-record-component'>
                <h3>Game Record</h3>
                <ul>
                    {recordElements}
                </ul>
            </div>
        )
    }
}


const GameRecord = connect(
    (state) => { return { board: state.game.board } }
)(GameRecordComponent)

export default GameRecord