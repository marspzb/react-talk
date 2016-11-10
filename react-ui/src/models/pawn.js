import Piece from './piece';

export default class Pawn extends Piece {
    constructor(positionX, player) {
        super();
        this.type = 'pawn';
        this.player = player;
        this.positionY = this.initialPosition();
        this.positionX = positionX;
        this.acronym = '';
    }

    initialPosition() {
        return this.player == 'white' ? 1 : 6;
    }

    _expectedSign() {
        return this.player == 'white' ? 1 : -1;
    }
    canMove(newPosX, newPosY, board) {
        if (newPosX != this.positionX) {
            return false;
        }
        var diff = newPosY - this.positionY;
        var sign = this.player == 'white' ? 1 : -1;

        if (this.positionY == this.initialPosition() && diff == 2 * sign) {
            return true
        } else if (diff == sign) {
            return true;
        } else {
            return null;
        }
    }
    canEat(newPosX, newPosY, board) {
        var diff = newPosY - this.positionY;
        if (diff != this._expectedSign()) {
            return false;
        }
        if (Math.abs(newPosX - this.positionX) != 1) {
            return false;
        }
        var lastMove = board.lastMovement();
        if (lastMove && lastMove.piece.type == 'pawn' && this.between(newPosY, lastMove.fromY, lastMove.y)) {
            return true;
        }
        var piece = board.getPiece(newPosX, newPosY);

        return piece && piece.type !== 'king';

    }


    between(num, a, b) {
        return Math.min(a, b) < num && num < Math.max(a, b);
    }

    move(newPosX, newPosY) {
        var clone = new Pawn(newPosX, this.player);
        clone.positionX = newPosX;
        clone.positionY = newPosY;
        return clone;
    }



}