import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react';

//import SpSearchPanel from './SpSearchPanel.tsx';
//import SpSearchCriteria from './SpSearchPanel.tsx';
import { PsrItem } from './PsrItem.ts';
import SpGrid from './SpGrid.tsx';

const fakerows = [
    { gen: "Forms", release: "19.0.0", unixbuild: true, patchset: "19.0.0-0200" },
    { gen: "Forms", release: "19.0.5", unixbuild: true, patchset: "19.0.5-0050" },
    { gen: "Forms", release: "18.0.0", unixbuild: false, patchset: "18.0.0-0100" },
    { gen: "Desktop", release: "20.0.0", unixbuild: true, patchset: "20.0.0-0010" },
    { gen: "Desktop", release: "20.0.1", unixbuild: false, patchset: "20.0.1-0020" },
    { gen: "Desktop", release: "20.0.1", unixbuild: true, patchset: "20.0.1-0010" }
];

export interface SpSearchCriteria {
    fltGeneration: string,
}

interface SpSearchPanelProps {
    searchClicked: (criteria: SpSearchCriteria) => void,
};

function SpSearchPanel(props: SpSearchPanelProps) {
    const [fltGeneration, set_fltGeneration] = useState('');
    const [fltRelease, set_fltRelease] = useState('');

    function handlerSearch(e) {
        let crit: SpSearchCriteria = { fltGeneration: fltGeneration };
        props.searchClicked(crit);
    }

    const [releases, setReleases] = useState([]);
    const [errorPanel, setErrorPanel] = useState("");

    async function loadReleases(data) {
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
    const [crt, set_crt] = useState<SpSearchCriteria>();

    async function LoadPsrItems() {
        const response = await fetch('api/PSRItems');
        const data = await response.json();
        setPsrItems(data);
        console.log(data);
    };

    useEffect(() => {
        LoadPsrItems();
    }, []);
    async function searchClicked(criteria: SpSearchCriteria) {
        console.log("Search clicked: gen=" + criteria.fltGeneration);
        set_crt(criteria);
        let uri = 'api/PSRItems';
        // maybe if is not needed
        //https://localhost:7208/api/PSRItems?gen= 
        // works too
        if (criteria.fltGeneration !== "") {
            uri += '?gen=' + criteria.fltGeneration;
        }
            
        const response = await fetch(uri);
        const data = await response.json();
        setPsrItems(data);
    }

    return (
        <div>
            <SpSearchPanel
                searchClicked={searchClicked}
            />
            <p>Search for crt.fltGeneration</p>
            <SpGrid
                rows={psrItems}
            />
        </div>
    );
}

export default ServicePack;