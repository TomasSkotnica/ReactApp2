function Square({ value, onSquareClick }) {
    return (
        <button style={{ backgroundColor: "grey", color: "yellow" }} className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default Square;