import React from 'react';
import { connect } from 'react-redux';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';


var PropTypes = React.PropTypes;

//import './chess-board.css';
var boardCellSize = 12.5;
var unit = '%';


function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}
function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}
const cellTarget = {
    drop(props, monitor, comp) {
        //console.log();
        var x = props.cellIdx;
        var y = props.rowIdx;

        props.movePiece(monitor.getItem().piece, x, y);
    }
};
class ChessCellComponent extends React.Component {
    render() {
        var blackWhiteClass = this.props.rowIdx % 2 != this.props.cellIdx % 2 ? 'chess-board-cell-black' : 'chess-board-cell-white';
        blackWhiteClass += " chess-board-cell";
        return this.props.connectDropTarget(<div className={blackWhiteClass}></div>);
    }
}

const ChessCell = connect(
    (state) => {
        //console.log(state); 
        return { board: state.game.board }
    },
    (dispatch) => {
        return {
            movePiece: (piece, x, y) => {
                dispatch({ type: 'MOVE', x: x, y: y, piece: piece });
            }
        }
    }
)(DropTarget('piece', cellTarget, collectTarget)(ChessCellComponent));

class ChessRow extends React.Component {
    render() {
        let rowIdx = this.props.rowIdx;
        var cells = this.props.row.map((cell, i) => {
            return <ChessCell rowIdx={this.props.rowIdx} cellIdx={i} key={i} />
        }, this);
        return <div className='chess-board-row'>
            {cells}
        </div>;
    }

}

const pieceSource = {
    beginDrag(props) {
        //console.log('draggin');
        return { piece: props.piece };
    },
    endDrag(props, monitor, comp) {
        //console.log(monitor.getDropResult());
        return { piece: props.piece }
    }
};



class ChessPieceComponent extends React.Component {
    render() {
        //console.log(this.props.connectDragSource);
        var p = this.props.piece;
        var className = "chess-piece chess-piece-" + this.props.piece.type + " " + this.props.piece.player;
        var top = (7 - p.y) * boardCellSize;
        var left = p.x * boardCellSize;
        var style = { top: top + unit, left: +left + unit };

        return this.props.connectDropTarget(this.props.connectDragSource(<div className={className} style={style}></div>));
    }
}
const pieceTarget = {
    drop(props, monitor, comp) {
        //console.log();
        var x = props.piece.x;
        var y = props.piece.y;

        props.movePiece(monitor.getItem().piece, x, y);
    }
};

const ChessPiece = connect(
    (state) => {
        //console.log(state); 
        return { board: state.game.board }
    },
    (dispatch) => {
        return {
            movePiece: (piece, x, y) => {
                dispatch({ type: 'MOVE', x: x, y: y, piece: piece });
            }
        }
    }
)(DropTarget('piece', pieceTarget, collectTarget)(DragSource('piece', pieceSource, collect)(ChessPieceComponent)));
class BoardDragContextComponent extends React.Component {
    render() {
        return <div class='l-chess-board-container'>
            {this.props.children}
        </div>
    }
}

const BoardDragContext = DragDropContext(HTML5Backend)(BoardDragContextComponent)
class ChessBoardComponent extends React.Component {
    render() {

        var rows = this.props.board.board.map((row, i) => {
            return <ChessRow row={row} rowIdx={7 - i} key={i} />

        });
        var pieces = this.props.board.getPieces().map((p) => {
            return <ChessPiece piece={p} key={p.id} />
        });
        return <BoardDragContext>
            <div className='chess-board-container'>
                <div className='chess-board'>
                    {rows}
                </div>


                {pieces}


            </div>
        </BoardDragContext>

    }


}


const ChessBoard = connect(
    (state) => {
        //console.log(state); 
        return { board: state.game.board }
    }
)(ChessBoardComponent)

export default ChessBoard