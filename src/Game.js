import React, { useState } from 'react';
import './Game.css';

const Game = () => {
    const initialBoard = Array(9).fill(null);
    const [board, setBoard] = useState(initialBoard);
    const [xIsNext, setXIsNext] = useState(true);
    const [winningSquares, setWinningSquares] = useState([]);

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board).winner) return;
        const newBoard = [...board];
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const calculateWinner = (board) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: board[a], winningSquares: [a, b, c] };
            }
        }
        return { winner: null, winningSquares: [] };
    };

    const renderSquare = (index) => {
        const isWinningSquare = winningSquares.includes(index);
        return (
            <button className={`square ${isWinningSquare ? 'winning-square' : ''}`} onClick={() => handleClick(index)}>
                {board[index]}
            </button>
        );
    };

    const resetGame = () => {
        setBoard(initialBoard);
        setXIsNext(true);
        setWinningSquares([]);
    };

    const result = calculateWinner(board);
    const winner = result.winner;
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

    if (winner && winningSquares.length === 0) {
        setWinningSquares(result.winningSquares);
    }

    return (
        <div className="App">
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <button className="reset-button" onClick={resetGame}>Reset</button>
        </div>
    );
}

export default Game;
