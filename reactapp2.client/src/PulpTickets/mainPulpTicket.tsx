import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom/client'

import ServicePack from './ServicePack/ServicePack.tsx';
import Hotfix from './Hotfix/Hotfix.tsx';

let App = function App() {
    const [selectedButton, setSelectedButton] = useState("");

    function ServicePackClicked() {
        setSelectedButton("ServicePack");
    }

    function HotfixClicked() {
        setSelectedButton("Hotfix");
    }

    let content;
    if (selectedButton === "ServicePack") {
        content = <ServicePack />;
    } else if (selectedButton === "Hotfix") {
        content = <Hotfix />;
    } else {
        content = "press one of the buttons on the top";
    }

    return (
        <div>
            <div className="nav-bar-row">
                <button onClick={ServicePackClicked}>ServicePack</button>
                <button onClick={HotfixClicked}>Hotfix</button>
            </div>
            <div>
                {content}
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)