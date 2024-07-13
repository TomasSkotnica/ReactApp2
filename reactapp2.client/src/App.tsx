import { useEffect, useState, createContext } from 'react';
import './App.css';
import Kontakty from './Kontakty';

export const CurrentTab = createContext();

function App() {
    const [selectedTab, setSeletedTab] = useState("Kontakty");

    function KontaktyClicked() {
        setSeletedTab("Kontakty");
    }

    return (
        <div>
            <a href="./rootPSR.html">Patchset request page</a>
            <a href="./rootKontakty.html">Kontakty page</a>
            <button onClick={KontaktyClicked}>Kontakty</button>
            <Kontakty/>
        </div>
    );

}

export default App;