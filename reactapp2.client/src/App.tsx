import { useEffect, useState, createContext } from 'react';
import './App.css';
import Kontakty from './Kontakty';
import PsrOne from './PsrOne.tsx';

function App() {
    const [previousTab, setPreviousTab] = useState("");
    const [selectedTab, setSelectedTab] = useState("");

    function KontaktyClicked() {
        setPreviousTab(selectedTab);
        setSelectedTab("Kontakty");
    }

    function PsrClicked() {
        setPreviousTab(selectedTab);
        setSelectedTab("Psr");
    }

    let content;
    if (selectedTab === "Kontakty") {
        content = <Kontakty />;
    } else if (selectedTab === "Psr") {
        content = <PsrOne />;
    } else {
        content = "home page";
    }

    // na bar style="position: fixed;top:0;left:0;width:100%;display: flex; justify-content: space-around;"

    return (
        <div>
            <div className="nav-bar-row">
                <a href="./rootPSR.html">Patchset request page</a>&nbsp;
                <a href="./rootKontakty.html">Kontakty page</a>&nbsp;
                <button onClick={KontaktyClicked}>Kontakty</button>
                <button onClick={PsrClicked}>SP request</button>
            </div>
            { content}
        </div>
    );

}

export default App;