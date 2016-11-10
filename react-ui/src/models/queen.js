import Piece from './piece';

export default class Queen extends Piece {
    constructor(player) {
        super();
        this.type = 'queen';
        this.player = player;
        this.positionX = 3;
        this.positionY = this.initialYPosition();
        this.acronym = 'Q';
    }

    canMove(newPosX, newPosY, board) {
        var diffX = Math.abs(newPosX - this.positionX);
        var diffY = Math.abs(newPosY - this.positionY);
        return diffX == diffY || (diffX == 0 && diffY > 0) || (diffX > 0 && diffY == 0);
    }

    move(newPosX, newPosY) {
        if (this.canMove(newPosX, newPosY)) {
            var clone = new Queen(this.player);
            clone.positionX = newPosX;
            clone.positionY = newPosY;
            return clone;
        }
        return null;
    }
}