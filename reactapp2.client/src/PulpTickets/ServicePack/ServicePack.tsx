import { useState, useEffect } from 'react';

//import SpSearchPanel from './SpSearchPanel.tsx';
//import SpSearchCriteria from './SpSearchPanel.tsx';
import { IdNameItem, ComboBoxIdNameProps, SpSearchIdCriteria, SpSearchPanelProps } from "./../../../lib/PulpTicketsTypes.ts";

import PsrItem from './PsrItem.ts';
import SpGrid from './SpGrid.tsx';
import SpSearchPanel from './SpSearchPanel.tsx';
export interface SpSearchCriteria {
    fltGeneration: string,
}

interface SpSearchPanelProps {
    searchClicked: (criteria: SpSearchCriteria) => void,
};

function SpSearchPanel1(props: SpSearchPanelProps) {
    const [fltGeneration, set_fltGeneration] = useState('');
    const [fltRelease, set_fltRelease] = useState('');

    function handlerSearch(e) {
        let crit: SpSearchCriteria = { fltGeneration: fltGeneration };
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
            <button onClick={handlerSearch}>TODO: Show Selected</button>
            <br></br>
            <label>select generation:</label>
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
            <input type="text" value={errorPanel} placeholder="this is an error message field" onChange={() => { } } />
        </div>
    );
}

function ServicePack() {
    const [psrItems, setPsrItems] = useState<PsrItem[]>([]);

    async function LoadPsrItems(criteria: SpSearchIdCriteria | undefined) {
        console.log("----------- LoadPsrItems");
        let uri = 'api/PSRItems';
        if (criteria != undefined) {
            if (criteria.fltGeneration != undefined)
                uri += '?genid=' + criteria.fltGeneration;
        }
        console.log(uri);
        const response = await fetch(uri);
        const data = await response.json();
        setPsrItems(data);
        console.log(data);
    };

    useEffect(() => {
        LoadPsrItems(undefined);
    }, []);
    async function searchClicked1(criteria: SpSearchCriteria) {
        console.log("----------- Search clicked: gen=" + criteria.fltGeneration);
        LoadPsrItems(criteria);
    //    let uri = 'api/PSRItems';
    //    //https://localhost:7208/api/PSRItems?gen= //    // works too
    //    if (criteria.fltGeneration !== "") {uri += '?gen=' + criteria.fltGeneration; }
    //    const response = await fetch(uri);
    //    const data = await response.json();
    //    setPsrItems(data);
    }

    async function searchClicked(criteria: SpSearchIdCriteria) {
        console.log("----------- Search clicked: gen=" + criteria.fltGeneration);
        LoadPsrItems(criteria);
    }

    async function addForms() {
        const toSaveItem = {genid:1, gen: "Forms", release: "20.0.5", patchset: "20.0.5-0010", unixBuild: true };
        fetch('api/PSRItems/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(toSaveItem),
        })
        .then((response) => {
            if (!response.ok) { throw new Error(`HTTP error: ${response.status}`); }
            return response.json();
        })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });

        LoadPsrItems(undefined);
    }

    return (
        <div>
            <SpSearchPanel
                searchClicked={searchClicked}
            />
            <SpGrid
                rows={psrItems}
            />
            <button onClick={addForms}>Add Forms SP</button>
        </div>
    );
}

export default ServicePack;