export default class Piece {
    constructor() {

    }
    opositePlayer() {
        return this.player == 'white' ? 'black' : 'white';
    }
    canMove(newPosX, newPosY) {
        return false;
    }

    initialYPosition() {
        return this.player == 'white' ? 0 : 7;
    }

    canEat(newPosX, newPosY, board) {
        var piece = board.getPiece(newPosX, newPosY);

        return piece && piece.type !== 'king' && piece.player !== this.player && this.canMove(newPosX, newPosY, board);
    }



    get x() {
        return this.positionX;
    }
    get y() {
        return this.positionY;
    }
}