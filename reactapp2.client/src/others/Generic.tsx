import React from 'react';

import { useState } from 'react';

type IdNameItem = {
    id: number;
    name:string;
}

type GenericProps<T> = { options: T[], selectedO: T, onOptionClick: (theme: T) => void };

function GenericIdName<IdNameItem>({ options, selectedO, onOptionClick }: GenericProps<IdNameItem>) {
    console.log("GenericIdName returns ...");
    return (
        <ul>
            {options.map((theme, index) => (
                <li key={index}>
                    <button
                        onClick={() => onOptionClick(theme)}
                        className={theme.id === selectedO.id ? "font-bold" : ""}
                    >
                        {theme.name}
                    </button>
                </li>
            ))}
        </ul>
    );
}
export default function Themes() {
    console.log("Themes started");
    const tOpt = ["a", "b", "c"];
    const [selectedT, setSelectedT] = useState(tOpt[0]);
    const Gens: IdNameItem[] = [];
    const i1: IdNameItem = { id: 1, name:"Form"};
    Gens.push(i1);
    const i2: IdNameItem = { id: 2, name: "Deskt" };
    Gens.push(i2);
    const [selIt, setSelIt] = useState(Gens[0]);

    console.log("Themes returns ...");
    return (<>
        <GenericIdName options={Gens} selectedO={selIt} onOptionClick={(theme) => setSelIt(theme)} />
        <p>Selected theme: {selIt.name}</p>
        <Generic options={tOpt} selectedO={selectedT} onOptionClick={(theme) => setSelectedT(theme)} />
        <p>Selected theme: {selectedT}</p>
    </>);
}

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

