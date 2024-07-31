import { useState } from 'react';
import './App.css';
import Kontakty from './Kontakty';
import TicTacToe from './TicTacToe/TicTacToe.tsx';
import TTT from './TicTacToe/TTT_vzor1.tsx';


function App() {
    const [selectedTab, setSelectedTab] = useState("");

    function KontaktyClicked() {
        setSelectedTab("Kontakty");
    }

    function TicTacToeClicked() {
        setSelectedTab("TicTacToe");
    }
    function TTTClicked() {
        setSelectedTab("TTT");
    }

    let content;
    if (selectedTab === "Kontakty") {
        content = <Kontakty />;
    } else if (selectedTab === "TicTacToe") {
        content = <TicTacToe />;
    } else if (selectedTab === "TTT") {
        content = <TTT />;
    } else {
        content = "home page";
    }

    // na bar style="position: fixed;top:0;left:0;width:100%;display: flex; justify-content: space-around;"

    return (
        <div>
            <div className="nav-bar-row">
                <a href="./rootPulpTicketSystem.html">Pulp page</a>&nbsp;
                <a href="./rootPSR.html">SP request page</a>&nbsp;
                <a href="./rootKontakty.html">Kontakty page</a>&nbsp;
                <button onClick={KontaktyClicked}>Kontakty</button>
                <button onClick={TicTacToeClicked}>TicTacToe game</button>
                <button onClick={TTTClicked}>TicTacToe vzor</button>
            </div>
            <div>
                {content}
            </div>
        </div>
    );

}

export default App;