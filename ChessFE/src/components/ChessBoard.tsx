import { Color, PieceSymbol, Square } from "chess.js";
import { useEffect, useState } from "react";
import { MOVE, INIT_GAME } from "../pages/GamePage";

function ChessBoard({
  board,
  chess,
  socket,
  setBoard,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  chess: any;
  socket: WebSocket;
  setBoard: any;
}) {
  const [from, setFrom] = useState<null | Square>(null);

  useEffect(() => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === MOVE) {
        const move = message.payload.move;
        chess.move(move);
        setBoard(chess.board());
      } else if (message.type === INIT_GAME) {
        const { color } = message.payload;
        console.log(`You are playing as ${color}`);
      }
    };

    return () => {
      socket.onmessage = null;
    };
  }, [socket, chess, setBoard]);

  return (
    <div className="text-white-200">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;
              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepresentation);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );
                      chess.move({
                        from,
                        to: squareRepresentation,
                      });
                      setBoard(chess.board());
                      setFrom(null);
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 ${
                    (i + j) % 2 === 0 ? "bg-green-500" : "bg-green-300"
                  }`}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col">
                      {square ? square.type : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ChessBoard;
