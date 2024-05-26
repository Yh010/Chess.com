import ChessBoard from "../components/ChessBoard";

function GamePage() {
  return (
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full bg-red-400">
          <div className="w-full bg-red-200 col-span-4">
            <ChessBoard />
          </div>
          <div className="col-span-2 w-full bg-green-200">
            <button>Play</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
