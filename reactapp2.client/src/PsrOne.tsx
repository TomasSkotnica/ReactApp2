//import React from 'react';
import { useEffect, useState } from 'react';

import './PsrOne.css';

function PsrOne() {
    const [releases, setReleases] = useState([]);
    const [spacks, setSPacks] = useState([]);
    async function handG(event) {
        setSPacks([]);
        const data = event.target.value;
        console.log("passed value is " + data);
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
        console.log("passed value is " + data);
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


    const relItems =
        releases.map((item) => <option key={item} value={item}>{item}</option>);
    const spackItems =
        spacks.map((item) => <option key={item} value={item}>{item}</option>);

    const editForm = <div id="editform" className="hidden">
        <div>
            <pre></pre>
            <label>select generation:</label>
            <select id="gen" name="gen" onChange={handG}>
                <option value="1">Forms</option>
                <option value="3">Desktop</option>
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
            <select id="spack" name="spack">
                {spackItems}
            </select>
        </div>
        <button id="saveButton" onClick={saveClicked}>Save request</button>
    </div>;

    function saveClicked() {
        var editElement = document.getElementById('editform');
        var mainElement = document.getElementById('mainpsr');
        mainElement.classList.remove('hidden');
        mainElement.classList.add('visible');
        editElement.classList.remove('visible');
        editElement.classList.add('hidden');
    }

    function newClicked() {
        var mainElement = document.getElementById('mainpsr');
        var editElement = document.getElementById('editform');
        mainElement.classList.remove('visible');
        mainElement.classList.add('hidden');
        editElement.classList.remove('hidden');
        editElement.classList.add('visible');
    }

    const mainPsr = <div id="mainpsr" className="visible">
        <button id="addButton" onClick={newClicked}>New request</button>

    </div>;


  return (<>
      {editForm}
      {mainPsr}
  </>);
}

export default PsrOne;