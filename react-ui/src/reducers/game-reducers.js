import Board from '../models/board';
const initialState = { board: new Board() };


export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case "MOVE":
            var newBoard = state.board.move(action.piece.x, action.piece.y, action.x, action.y);
            if (newBoard) {
                return Object.assign({}, state, { board: newBoard });
            } else {
                return state;
            }


        default:

            return state;

    }
};
