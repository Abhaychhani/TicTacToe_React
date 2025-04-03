import React, { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(Math.random > 0.5 ? true : false);

  const handleClick = (index) => {
    if (board[index] || checkWins(board) || isDraw(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const checkWins = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isDraw = (board) => {
    return board.every((box) => box !== null) && !checkWins(board);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(Math.random > 0.5 ? true : false);
  };

  const winner = checkWins(board);
  const draw = isDraw(board);
  const status = winner
    ? `Winner is ${winner}`
    : draw
    ? "It's a draw"
    : `${isXNext ? "X" : "O"} Player Move`;

  const borderStyle = [
    "border-r-4 border-b-4",
    "border-x-4 border-b-4",
    "border-l-4 border-b-4",
    "border-y-4 border-r-4",
    "border-4",
    "border-y-4 border-l-4",
    "border-t-4 border-r-4",
    "border-x-4 border-t-4",
    "border-l-4 border-t-4",
  ];
  return (
    <>
      <div className=" absolute top-1/2 left-1/2" style={{transform:"translate(-50%,-50%)"}}>
        <div className="grid grid-cols-3 grid-rows-3  w-[290px] md:w-[450px] aspect-square mx-auto md:my-6 mb-6">
          {board.map((value, index) => (
            <div
              className={`${borderStyle[index]} border-sky-500 font-mono font-bold text-5xl flex items-center justify-center`}
              key={index}
              onClick={() => {
                handleClick(index);
              }}
            >
              {value}
            </div>
          ))}
        </div>
        <button
          className="bg-blue-500 px-6 py-1 rounded mx-auto text-white cursor-pointer block "
          onClick={resetGame}
        >
          reset
        </button>
        <span className=" block text-center py-4 ">{status}</span>
      </div>
    </>
  );
}

export default App;
