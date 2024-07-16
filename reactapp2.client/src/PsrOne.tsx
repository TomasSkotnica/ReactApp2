//import React from 'react';
import { useEffect, useState } from 'react';

import './PsrOne.css';
import './PsrItem.ts';
import { PsrItem } from './PsrItem.ts';

function PsrOne() {
    const [selectedTab, setSelectedTab] = useState("PsrMain");

    function saveClicked() {
        // save record, then switch to main subpage
        const toSaveItem = { gen: selGen, release: selRel, patchset: selPs, unixbuild: false };

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
                setReleases(result);
            })
            .catch((error) => {
                //document.querySelector("pre").textContent = `Could not fetch verse: ${error}`;
                console.log(error);
            });

        setSelectedTab("MainPsr"); 
    }

    function newClicked() {
        setSelectedTab("EditForm");
    }

    const [selGen, setSelGen] = useState();
    const [selRel, setSelRel] = useState();
    const [selPs, setSelPs] = useState();

    const [releases, setReleases] = useState([]);
    const [spacks, setSPacks] = useState([]);
    async function handG(event) {
        setSPacks([]);
        const data = event.target.value;
        setSelGen(data);
        console.log("selected gen is " + data);
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
                setReleases(result);
            })
            .catch((error) => {
                document.querySelector("pre").textContent = `Could not fetch verse: ${error}`;
            });
        //const response = await fetch('api/PSRItems/releases');
        //const result = await response.json();
    };

    async function handR(event) {
        const data = event.target.value;
        setSelRel(data);
        console.log("selected release is " + data);
        fetch('/api/PSRItems/spacks/' + data, {
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
                setSPacks(result);
            })
            .catch((error) => {
                document.querySelector("pre").textContent = `Could not fetch verse: ${error}`;
            });
    };

    async function handP(event) {
        const data = event.target.value;
        setSelPs(data);
        console.log("selected PS is " + data);
    };

    const relItems =
        releases.map((item) => <option key={item} value={item}>{item}</option>);
    const spackItems =
        spacks.map((item) => <option key={item} value={item}>{item}</option>);

    const editForm = <div id="editform">
        <div>
            <pre></pre>
            <label>select generation:</label>
            <select id="gen" name="gen" onChange={handG}>
                <option value="Forms">Forms</option>
                <option value="Desktop">Desktop</option>
            </select>
        </div>
        <div>
            <label>select release:</label>
            <select id="release" name="release" onChange={handR}>
                {relItems}
            </select>
        </div>
        <div>
            <label>select SP:</label>
            <select id="spack" name="spack" onChange={handP}>
                {spackItems}
            </select>
        </div>
        <button id="saveButton" onClick={saveClicked}>Save request</button>
    </div>;

    const [psrs, setPsrs] = useState<PsrItem[]>([]);

    async function LoadPsrs() {
        const response = await fetch('api/PSRItems');
        const data = await response.json();
        setPsrs(data);
    };

    useEffect(() => {
        LoadPsrs();
    }, []);

    function GetYN(b) {
        console.log(b);
        const v = b ? 'y' : 'n';
        return v;
    }

    //tak by to melo fungovat:
    //const user = {
    //    b: true
    //};
    //<h1>{user.b ? "y" : "n"}</h1>

    const psrItems =
        psrs?.map(item =>
            <tr key={item.patchset}>
                <td>{item.gen}</td>
                <td>{item.release}</td>
                <td>{item.patchset}</td>
                <td>{GetYN(item.unixbuild)}</td>
            </tr>
        );

    const psrTable =
        <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Generation</th>
                    <th>Release</th>
                    <th>Service Pack</th>
                    <th>Unix build</th>
                </tr>
            </thead>
            <tbody>
                {psrItems}
            </tbody>
        </table>;

    const mainPsr = <div id="mainpsr">
        <button id="addButton" onClick={newClicked}>New request</button>
        <ol>{psrTable}</ol>

    </div>;

    let content;
    if (selectedTab === "EditForm") {
        content = editForm;
    } else if (selectedTab === "PsrMain") {
        content = mainPsr;
    } else {
        content = "PsrOne - no selection of subpage was done to display";
    }


  return (<>
      {content}
  </>);
}

export default PsrOne;