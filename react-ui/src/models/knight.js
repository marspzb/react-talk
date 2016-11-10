import Piece from './piece';

export default class Knight extends Piece {
    constructor(positionX, player) {
        super();
        this.type = 'knight';
        this.acronym = 'K';
        this.player = player;
        this.positionX = positionX;
        this.positionY = this.initialYPosition();
    }

    canMove(newPosX, newPosY) {
        var diffX = Math.abs(newPosX - this.positionX);
        var diffY = Math.abs(newPosY - this.positionY);
        return diffX + diffY == 3 && diffX > 0 && diffY > 0;
    }
    move(newPosX, newPosY) {
        if (this.canMove(newPosX, newPosY)) {
            var clone = new Knight(newPosX, this.player);
            clone.positionX = newPosX;
            clone.positionY = newPosY;
            return clone;
        }
        return null;
    }

}