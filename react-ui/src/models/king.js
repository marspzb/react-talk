import Piece  from './piece';

export default class King extends Piece {
    constructor(player) {
        super();
        this.type = 'king';
        this.acronym='K';
        this.player = player;
        this.positionX = this.initialXPosition();
        this.positionY = this.initialYPosition();

    }
    initialXPosition() {
        return 4;
    }


    canMove(newPosX, newPosY, board) {
        var diffX = Math.abs(newPosX - this.positionX);
        var diffY = Math.abs(newPosY - this.positionY);
        return diffX == diffY || (diffX == 0 && diffY > 0) || (diffX > 0 && diffY == 0);
    }

    move(newPosX, newPosY) {
        if (this.canMove(newPosX, newPosY)) {
            var clone = new King(this.player);
            clone.positionX = newPosX;
            clone.positionY = newPosY;
            return clone;
        }
        return null;
    }
}