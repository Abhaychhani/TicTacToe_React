import React, { useRef, useState } from "react";
import circle from './assets/circle.png';
import cross from './assets/cross.png';
import clickAudio from './assets/click.mp3';
import winAudio from './assets/wins.mp3';

function App() {
  const clickAudioElement = useRef(0);
  const winAudioElement = useRef(0);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(Math.random() > 0.5 ? false : true);


  const handleClick = (index) => {
    clickAudioElement.current.play();
    if (board[index] || checkWins(board) || isDraw(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? cross : circle;
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
        winAudioElement.current.play();
        if(board[a] === circle){
          return "O";
        }else{
          return "X";
        }
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
    <audio src={clickAudio} ref={clickAudioElement}></audio>
    <audio src={winAudio} ref={winAudioElement}></audio>
      <div className=" absolute top-1/2 left-1/2" style={{transform:"translate(-50%,-50%)"}}>
        <div className="grid grid-cols-3 grid-rows-3  w-[290px] md:w-[450px] aspect-square mx-auto md:my-6 mb-6">
          {board.map((value, index) => (
            <div
              className={`${borderStyle[index]} border-black  flex items-center justify-center`}
              key={index}
              onClick={() => {
                handleClick(index);
              }}
            >
              <img src={value} className="relative h-20" />
            </div>
          ))}
        </div>
        <button
          className="bg-red-400 px-6 py-1 rounded mx-auto text-white cursor-pointer block "
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
