import Bishop from './bishop';
import King from './king';
import Queen from './queen';
import Knight from './knight';
import Pawn from './pawn';
import Tower from './tower';
import Move from './move';
export default class Board {


    constructor() {
        this.board = [];

        for (var i = 0; i < 8; i++) {
            var row = [];
            for (var j = 0; j < 8; j++) {
                row.push(null);
            }
            this.board.push(row);
        }

        for (var i = 0; i < 8; i++) {
            this.addPiece(new Pawn(i, 'white'));
            this.addPiece(new Pawn(i, 'black'));

        }
        this.addDefaultPieces('white');
        this.addDefaultPieces('black');
        //console.log(this.board);
        this.moves = [];
        this.lastMoveId = 0;

    }

    addDefaultPieces(player) {
        this.addPiece(new Tower(0, player));
        this.addPiece(new Knight(1, player));
        this.addPiece(new Bishop(2, player));
        this.addPiece(new Queen(player));
        this.addPiece(new King(player));
        this.addPiece(new Bishop(5, player));
        this.addPiece(new Knight(6, player));
        this.addPiece(new Tower(7, player));
    }

    addPiece(piece) {
        this.board[piece.y][piece.x] = piece;
    }
    getPiece(x, y) {
        return this.board[y][x];
    }

    move(posX, posY, toX, toY) {
        var piece = this.getPiece(posX, posY);
        if (piece && this.canMove(piece)) {
            let b = this.clone();
            var check = false;
            //console.log(piece, toX, toY);
            //console.log(piece.canEat(toX, toY, this));
            if (piece.canEat(toX, toY, this) || (piece.canMove(toX, toY, this) && !this.getPiece(toX, toY))) {
                b.moves.push(new Move(piece, posX, posY, toX, toY, check, this.lastMoveId++));
                //console.log(this.movements);
                b.board[piece.y][piece.x] = null;
                b.board[toY][toX] = piece.move(toX, toY);
                //console.log('moved');
                //console.log(b.board);
                return b;
            }

        }

    }
    canMove(piece) {
        return piece.player == this.expectedPlayer();
    }
    expectedPlayer() {
        var lastMovement = this.lastMovement();
        var expectedPlayer = "white";
        //console.log(lastMovement);
        if (lastMovement && lastMovement.piece.player == 'white') {
            expectedPlayer = 'black';
        }
        return expectedPlayer;
    }
    lastMovement() {
        if (this.moves.length == 0) {
            return null;
        }
        return this.moves[this.moves.length - 1];
    }

    clone() {
        var b = new Board();
        b.moves = [].concat(this.moves)
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                b.board[i][j] = this.board[i][j];
            }
        }
        return b;
    }

    getPieces() {
        var pieces = [];
        //console.log(this.board);
        this.board.forEach(function (row) {
            row.forEach(function (cell) {
                if (cell) {
                    pieces.push(cell);
                }
            });
        })
        return pieces;
    }
}