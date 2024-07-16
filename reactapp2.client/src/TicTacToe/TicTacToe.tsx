import { useState } from 'react';
import Square from './Square.tsx';

class Tah {
    count: number;
    player: string;
    status: string;
    constructor(c, p, s) {
        this.count = c;
        this.player = p;
        this.status = s;
    }
}

function TicTacToe() {
    const [nextTah, setNexttah] = useState(setTahProperties(0));
    const [squares, setSquares] = useState(Array(9).fill(null));

    function setTahProperties(currentStep) {
        const count = currentStep + 1;
        const player = (count % 2) === 0 ? "X" : "O";
        const status = `Step number ${count} will play ${player}`;
        const t = new Tah(count, player, status);
        console.log("zobrazi se " + t.status);
        return t;
    }

    function setWinner(player) {
        const status = `Winner is ${player}`;
        const t = new Tah(0, "", status);
        console.log(t.status);
        return t;
    }
    
    function handleClick(index) {
        if (!nextTah.status.includes("Winner")) {
            console.log(`V kole ${nextTah.count} tahne ${nextTah.player} na poli ${index}`);
            const novepole = Array(9).fill(null);
            for (let i = 0; i < novepole.length; i++) {
                novepole[i] = squares[i];
            }
            novepole[index] = nextTah.player;
            setSquares(novepole);

            const winner = calculateWinner(novepole);
            if (winner !== null) {
                setNexttah(setWinner(winner));
            } else {
                setNexttah(setTahProperties(nextTah.count));
            }
        }
    }

    function setNewGame() {
        setNexttah(setTahProperties(0));
        setSquares(Array(9).fill(null));
    }

    let cont = <div>
        <div className="status">{nextTah.status}</div>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
    </div>;
        

    return (
        <>
            Piskvorky<br />
            {cont}
            <button onClick={setNewGame}>New game</button>
        </>
    );

    function calculateWinner(squares) {
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
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

}

export default TicTacToe;