import Piece from './piece';

export default class Tower extends Piece {
    constructor(positionX, player) {
        super();
        this.type = 'tower';
        this.player = player;
        this.positionX = positionX;
        this.positionY = this.initialYPosition();
        this.acronym = 'R';
    }

    canMove(newPosX, newPosY, board) {
        var diffX = Math.abs(newPosX - this.positionX);
        var diffY = Math.abs(newPosY - this.positionY);
        return (diffX == 0 && diffY != 0) || (diffY == 0 && diffX != 0);
    }

    move(newPosX, newPosY) {
        if (this.canMove(newPosX, newPosY)) {
            var clone = new Tower(newPosX, this.player);
            clone.positionX = newPosX;
            clone.positionY = newPosY;
            return clone;
        }
        return null;
    }

}