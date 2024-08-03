import { useState } from 'react';

export default function Themes() {
    console.log("Themes started");
    const tOpt = ["a", "b", "c"];
    const [selectedT, setSelectedT] = useState(tOpt[0]);
    console.log("Themes returns ...");
    return (<>
        <Generic options={tOpt} selectedO={selectedT} onOptionClick={(theme) => setSelectedT(theme)} />
        <p>Selected theme: {selectedT}</p></>
    );
}

type GenericProps<T> = { options: T[], selectedO: T, onOptionClick: (theme:T)=>void };

// function Generic(props: { fOpt: string[] }) { // misto props: muzeme psat {mojeOpt} a pouzit mojeOpt.map()
// f*** znamena function v tomto priklade
function Generic<T extends React.ReactNode>({ options, selectedO, onOptionClick }: GenericProps<T>) {
    console.log("Generic returns ...");
    return (
        <ul>
            {options.map((theme, index) => (
                <li key={index}>
                    <button
                        onClick={() => onOptionClick(theme)}
                        className={theme === selectedO ? "font-bold" : ""}
                    >
                        {theme}
                    </button>
                </li>
            ))}
        </ul>
    );

}
