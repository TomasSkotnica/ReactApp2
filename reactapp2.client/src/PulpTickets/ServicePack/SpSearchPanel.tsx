import { useState } from 'react';
import { useState, useEffect } from 'react';

import { IdNameItem, ComboBoxIdNameProps, SpSearchIdCriteria, SpSearchPanelProps } from "./../../../lib/PulpTicketsTypes.ts";
import ComboBoxIdName from "./../Common/ComboBoxIdName";
export default function SpSearchPanel(props: SpSearchPanelProps) {
    const [fltGeneration, set_fltGeneration] = useState('');
    const [fltRelease, set_fltRelease] = useState('');

    const GensNull: IdNameItem[] = [];
    const n0: IdNameItem = { id: null, name: "-select-"}; GensNull.push(n0);
    const n1: IdNameItem = { id: 1, name: "Forms"}; GensNull.push(n1);
    const n2: IdNameItem = { id: 2, name: "Desktop"}; GensNull.push(n2);
    const [selGenNull, setSelGenNull] = useState(GensNull[0]);

    function handlerSearch(e) {
        let crit: SpSearchIdCriteria = { fltGeneration: selGenNull.id !== undefined ? selGenNull.id : undefined };
        console.log("creiterium  ......  " + crit.fltGeneration);
        props.searchClicked(crit);
    }

    const [releases, setReleases] = useState([]);
    const [errorPanel, setErrorPanel] = useState("");

    async function loadReleases(data) {
        console.log("-------- loadReleases");
        fetch('api/PSRItems/releases/' + data, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) { throw new Error(`HTTP error: ${response.status}`); }
                return response.json();
            })
            .then((result) => {
                console.log(result);
                result.splice(0, 0, "");
                setReleases(result);
            })
            .catch((error) => {
                setErrorPanel(error);
            });
    };

    useEffect(() => { loadReleases(""); }, []);

    const relItems = releases.map((item) => <option key={item} value={item}>{item}</option>);

    return (
        <div className="psronemain-menu">
            <button onClick={handlerSearch}>Search</button>
            <br></br>
            <label>select generation:</label>
            <ComboBoxIdName options={GensNull} onOptionSelection={(option) => setSelGenNull(option)} />
            <p>Selected Gen item in combobox: {selGenNull.name}</p>

            <select id="search-generation" value={fltGeneration} name="gen" onChange={e => set_fltGeneration(e.target.value)}>
                <option value=""></option>
                <option value="Forms">Forms</option>
                <option value="Desktop">Desktop</option>
            </select>
            <div>
                <label>select release:</label>
                <select id="search-release" value={fltRelease} name="release" onChange={e => set_fltRelease(e.target.value)}>
                    {relItems}
                </select>
            </div>
            <input type="text" value={errorPanel} placeholder="this is an error message field" onChange={() => { }} />
        </div>
    );
}
