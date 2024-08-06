import React from 'react';
import { useState } from 'react';

import { IdNameItem, ComboBoxIdNameProps } from "./../../lib/Types.ts";

type GenericProps<T> = { options: T[], selectedO: T, onOptionClick: (theme: T) => void };

// options - array of {id, name} - to fill in html tag - name is displayed, id is for setter of selected option
// selectedO - one record of {id, name} - to highlight selection in html tag
// onOptionClick - setter of selected option
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

function ComboBoxIdName<IdNameItem>({ options, onOptionSelection }: ComboBoxIdNameProps<IdNameItem>) {
    function SendSelectedOption(value: string) {
        onOptionSelection(options.filter(o => o.name === value)[0]);
    }
    return (
        <div>
            <label>select from items:</label>
            <select onChange={e => SendSelectedOption(e.target.value)}>
                {options.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
            </select>
        </div>
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
    const [selRowU, _] = useState(undefined);
    const [selRow0, _s] = useState(Gens[0]);

    const GensNull: IdNameItem[] = [];
    const n0: IdNameItem = { id: null, name: "-select-", desc: "" }; GensNull.push(n0);
    const n1: IdNameItem = { id: 1, name: "Form", desc: "oracle forms" }; GensNull.push(n1);
    const n2: IdNameItem = { id: 2, name: "Deskt", desc: "C++ client" }; GensNull.push(n2);
    const [selGenNull, setSelGenNull] = useState(GensNull[0]);

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
        <ComboBoxIdName options={GensNull} onOptionSelection={(option) => setSelGenNull(option)} />
        <p>Selected Gen item in combobox: {selGenNull.name}</p>
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

