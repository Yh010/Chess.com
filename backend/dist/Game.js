"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        // Initialize the game for both players
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        // Check if it's the correct player's turn
        if ((this.moveCount % 2 === 0 && socket !== this.player1) || (this.moveCount % 2 === 1 && socket !== this.player2)) {
            return;
        }
        try {
            // Attempt to make the move
            const result = this.board.move(move);
            // If the move is invalid, result will be null
            if (result === null) {
                console.log("Invalid move:", move);
                return;
            }
            // Broadcast the move to both players
            const message = JSON.stringify({
                type: messages_1.MOVE,
                payload: {
                    move,
                }
            });
            this.player1.send(message);
            this.player2.send(message);
            // Check if the game is over
            if (this.board.isGameOver()) {
                const gameOverMessage = JSON.stringify({
                    type: messages_1.GAME_OVER,
                    payload: {
                        winner: this.board.turn() === "w" ? "black" : "white",
                    }
                });
                this.player1.send(gameOverMessage);
                this.player2.send(gameOverMessage);
                return;
            }
            // Increment move count
            this.moveCount++;
        }
        catch (e) {
            console.error("Error making move:", e);
        }
    }
}
exports.Game = Game;
