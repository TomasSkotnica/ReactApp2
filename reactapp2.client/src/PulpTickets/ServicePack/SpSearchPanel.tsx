import { useState, useEffect } from 'react';

import { IdNameItem, ComboBoxIdNameProps, SpSearchIdCriteria, SpSearchPanelProps } from "./../../../lib/PulpTicketsTypes.ts";
import ComboBoxIdName from "./../Common/ComboBoxIdName";
export default function SpSearchPanel(props: SpSearchPanelProps) {
    const [fltRelease, set_fltRelease] = useState('');

    const GensNull: IdNameItem[] = [];
    const n0: IdNameItem = { id: null, name: "-select-"}; GensNull.push(n0);
    const n1: IdNameItem = { id: 1, name: "Forms"}; GensNull.push(n1);
    const n2: IdNameItem = { id: 2, name: "Desktop"}; GensNull.push(n2);
    const [selGenNull, setSelGenNull] = useState(GensNull[0]);

    const RelsNull: IdNameItem[] = [];
    const r0: IdNameItem = { id: null, name: "-select-" }; RelsNull.push(r0);
    const [selRelNull, setSelRelNull] = useState(RelsNull[0]);

    function handlerSearch(e) {
        let crit: SpSearchIdCriteria = { fltGeneration: selGenNull.id !== undefined ? selGenNull.id : undefined };
        console.log("creiterium  ......  " + crit.fltGeneration);
        props.searchClicked(crit);
    }

    const [releases, setReleases] = useState([]);
    const [errorPanel, setErrorPanel] = useState("");

    async function loadReleases(data) {
        console.log("-------- loadReleases");
        fetch('api/PSRItems/releasesOfGenId/' + data, {
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
                result.map(item => RelsNull.push({id: item.id, name: item.id}));

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

            <div>
                <label>select release:</label>
                <ComboBoxIdName options={RelsNull} onOptionSelection={(option) => setSelRelNull(option)} />
                <p>Selected Gen item in combobox: {selGenNull.name}</p>
                <select id="search-release" value={fltRelease} name="release" onChange={e => set_fltRelease(e.target.value)}>
                    {relItems}
                </select>
            </div>
            <input type="text" value={errorPanel} placeholder="this is an error message field" onChange={() => { }} />
        </div>
    );
}
