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

function ServicePack() {
    const [errorPanel, setErrorPanel] = useState("");
    const [psrItems, setPsrItems] = useState<PsrItem[]>([]);

    async function LoadPsrItems(criteria: SpSearchIdCriteria | undefined) {
        console.log("----------- LoadPsrItems");
        var qi: string[] = [];
        if (criteria != undefined) {
            if (criteria.fltGeneration != undefined)
                qi.push('genid=' + criteria.fltGeneration);
            if (criteria.fltRelease != undefined)
                qi.push('release=' + criteria.fltRelease);
        }

        let uri = 'api/PSRItems';
        if (qi.length > 0) {
            uri += '?' + qi[0];
            for (var i = 1; i < qi.length; i++) { uri += '&' + qi[i]; }
        }
        console.log(uri);
        await fetch(uri)
            .then((response) => {
                if (!response.ok) { throw new Error(`HTTP error: ${response.status}`); }
                return response.json();
            })
            .then((result) => {
                setPsrItems(result);
                console.log(result);
            })
            .catch((error) => {
                setErrorPanel("LoadPsrItems() error: " + error);
                console.log(error);
            });
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
            <input type="text" value={errorPanel} placeholder="this is an error message field" onChange={() => { }} />
        </div>
    );
}

export default ServicePack;