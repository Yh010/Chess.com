import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;

    private board: Chess;
    private moveCount = 0;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        
        // Initialize the game for both players
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }

    makeMove(socket: WebSocket, move: { from: string, to: string }) {
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
                type: MOVE,
                payload: {
                    move,
                }
            });

            this.player1.send(message);
            this.player2.send(message);

            // Check if the game is over
            if (this.board.isGameOver()) {
                const gameOverMessage = JSON.stringify({
                    type: GAME_OVER,
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

        } catch (e) {
            console.error("Error making move:", e);
        }
    }
}
