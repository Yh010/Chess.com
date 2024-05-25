import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

export class GameManager{
    private games: Game[];
    private waitingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.waitingUser = null;
        this.users = [];
    }
    addUser(socket: WebSocket) {
       /*  this.games.push(socket); */
        this.users.push(socket);
        this.addHandle(socket);
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
    }

    private addHandle(socket: WebSocket) {
        //what's this ??
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === INIT_GAME) {
                if (this.waitingUser) {
                    //start the game
                    const game = new Game(this.waitingUser, socket);
                    this.games.push(game);
                    this.waitingUser = null;

                } else {
                    this.waitingUser = socket;
                }
            }

            if (message.type === MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket , message.move)
                }
            }
        })

        

    }
}