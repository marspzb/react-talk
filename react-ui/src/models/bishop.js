import Piece from './piece';

export default class Bishop extends Piece {
    constructor(positionX, player) {
        super();
        this.type = 'bishop';
        this.acronym = 'B';
        this.player = player;
        this.positionX = positionX;
        this.positionY = this.initialYPosition();

    }

    canMove(newPosX, newPosY, board) {
        var diffX = Math.abs(newPosX - this.positionX);
        var diffY = Math.abs(newPosY - this.positionY);
        return diffX == diffY;
    }

    move(newPosX, newPosY) {
        if (this.canMove(newPosX, newPosY)) {
            var clone = new Bishop(newPosX, this.player);
            clone.positionX = newPosX;
            clone.positionY = newPosY;
            return clone;
        }
        return null;
    }
}