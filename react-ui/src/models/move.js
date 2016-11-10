export default class Move {
    constructor(piece, fromX, fromY, x, y, check, id) {
        this.piece = piece;
        this.fromX = fromX;
        this.fromY = fromY;
        this.x = x;
        this.y = y;
        this.check = check;
        this.id = id;
    }

    get notation() {
        return this.piece.acronym + this.formatX() + this.formatY()
    }
    formatX() {
        switch (this.x) {
            case 0:
                return 'a';
            case 1:
                return 'b';
            case 2:
                return 'c';
            case 3:
                return 'd';
            case 4:
                return 'e';
            case 5:
                return 'f';
            case 6:
                return 'g';
            case 7:
                return 'h';

        }
    }

    formatY() {
        return this.y + 1;
    }


}
