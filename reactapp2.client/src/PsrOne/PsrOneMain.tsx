import { useState } from 'react';
import './PsrOneMain.css';
import PsrList from './PsrList.tsx';
import PsrEditor from './PsrEditor.tsx';

function PsrOneMain() {
    const [clickedButton, setclickedButton] = useState("List");

    function ListClicked() {
        setclickedButton("List");
    }

    function NewClicked() {
        setclickedButton("New");
    }

    function EditClicked() {
        setclickedButton("Edit");
    }

    let content;
    if (clickedButton === "List") {
        content = <PsrList />;
    } else if (clickedButton === "New") {
        content = <PsrEditor showRequestOfKey={null} />;
    } else if (clickedButton === "Edit") {
        content = <PsrEditor showRequestOfKey={"20.0.5-0120"} />;
    } else {
        content = "psr page";
    }

    return (
            <div className="psronemain-menu">
                <button onClick={ListClicked}>List</button>
                <button onClick={NewClicked}>New</button>
                <button onClick={EditClicked}>Edit</button>
                {content}
            </div>
    );
}

export default PsrOneMain;