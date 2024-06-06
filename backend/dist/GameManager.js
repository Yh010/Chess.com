"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.waitingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandle(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
    }
    addHandle(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.INIT_GAME) {
                if (this.waitingUser) {
                    // Start the game
                    const game = new Game_1.Game(this.waitingUser, socket);
                    this.games.push(game);
                    this.waitingUser = null;
                    console.log(this.games);
                }
                else {
                    this.waitingUser = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
