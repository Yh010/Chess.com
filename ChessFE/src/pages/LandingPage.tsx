import { useNavigate } from "react-router-dom";
import ChessBoard from "../assets/chessBoard.png";
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img src={ChessBoard} className="max-w-96"></img>
          </div>
          <div className="pt-16">
            <div className="flex justify-center">
              <h1 className="text-4xl font-bold text-white">
                Play chess online
              </h1>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white text-2xl font-bold py-4 px-8 rounded"
                onClick={() => {
                  navigate("/gamePage");
                }}
              >
                Play now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
