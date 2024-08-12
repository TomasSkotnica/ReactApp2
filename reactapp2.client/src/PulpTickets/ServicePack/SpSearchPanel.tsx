import { useState, useEffect } from 'react';

import { IdNameItem, ComboBoxIdNameProps, SpSearchIdCriteria, SpSearchPanelProps } from "./../../../lib/PulpTicketsTypes.ts";
import ComboBoxIdName from "./../Common/ComboBoxIdName";
import ComboBoxSimple from "./../Common/ComboBoxSimple";
import { DataJsonService } from "./../Common/DataJsonService";

export default function SpSearchPanel(props: SpSearchPanelProps) {
    const [fltRelease, set_fltRelease] = useState('');

    const GensNull: IdNameItem[] = [];
    const n0: IdNameItem = { id: null, name: "-select-"}; GensNull.push(n0);
    const n1: IdNameItem = { id: 1, name: "Forms"}; GensNull.push(n1);
    const n2: IdNameItem = { id: 2, name: "Desktop"}; GensNull.push(n2);
    const [selGenNull, setSelGenNull] = useState(GensNull[0]);

    function handlerSearch(e) {
        let crit: SpSearchIdCriteria = {
            fltGeneration: selGenNull.id !== undefined ? selGenNull.id : undefined,
            fltRelease: fltRelease !== "-select-" ? fltRelease : undefined,
        };
        console.log("creiterium  ......  " + crit.fltGeneration);
        props.searchClicked(crit);
    }

    const [releases, setReleases] = useState([]);
    const [errorPanel, setErrorPanel] = useState("");

    async function loadReleases() {
        console.log("-------- loadReleases");
        fetch('api/PSRItems/releases', {
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
                result.splice(0, 0, "-select-");
                setReleases(result);
            })
            .catch((error) => {
                setErrorPanel("loadReleases():" + error);
            });
    };

    useEffect(() => { loadReleases(); }, []);

    return (
        <div className="psronemain-menu">
            <button onClick={handlerSearch}>Search</button>
            <br></br>
            <label>select generation:</label>
            <ComboBoxIdName options={GensNull} onOptionSelection={(option) => setSelGenNull(option)} />
            <p>Selected Gen item in combobox: {selGenNull.name}</p>

            <ComboBoxSimple options={releases} selected={fltRelease} onOptionSelection={set_fltRelease}></ComboBoxSimple>

            <input type="text" value={errorPanel} placeholder="this is an error message field" onChange={() => { }} />
        </div>
    );
}
