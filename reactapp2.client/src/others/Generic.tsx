import React from 'react';

import { useState } from 'react';

type IdNameItem = {
    id: number;
    name: string;
    desc: string;
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


type TableSelectableProps = { rows, selectedO , onOptionClick: (row) => void };
function MyTableSelectable({ rows, selectedO, onOptionClick }: TableSelectableProps) {
    return (
        <ul>
            {rows.map((row, index) => (
                <li key={index}>
                    <div
                        onClick={() => onOptionClick(row)}
                        className={row.id === selectedO.id ? "font-bold" : ""}
                    >
                        {row.id}&nbsp;{row.name}&nbsp;{row.desc}
                    </div>
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
    const i1: IdNameItem = { id: 1, name:"Form", desc:"oracle forms"};
    Gens.push(i1);
    const i2: IdNameItem = { id: 2, name: "Deskt", desc:"C++ client" };
    Gens.push(i2);
    const [selIt, setSelIt] = useState(Gens[0]);
    const [selRow, setSelRow] = useState("");
    const [selRowU, setSelRowU] = useState(undefined);
    const [selRow0, setSelRow0] = useState(Gens[0]);

    const SelUnsel = function (row) {
        console.log("old selected: "+selRow.id + ", actual: " + row.id);
        if (selRow && selRow.id && row.id === selRow.id) {
            console.log("set empty row");
            setSelRow("");
        }
        else {
            setSelRow(row);
            console.log("set " + row);
        }
    }

    console.log("Themes returns ...");
    return (<>
        <MyTableSelectable rows={Gens} selectedO={selRow} onOptionClick={(row) => SelUnsel(row)} />
        <p>Selected row id: {selRow && selRow.id}</p>
        <p>Selected row U id: {selRowU && selRowU.id}</p>
        <p>Selected row 0 id: {selRow0 && selRow0.id}</p>
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

