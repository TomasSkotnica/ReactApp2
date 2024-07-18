import { useEffect, useState } from 'react';

function PsrEditor({showRequestOfKey, backToListCallback}) {
    function saveClicked() {
        // save record, then switch to main subpage
        const toSaveItem = { gen: selGen, release: selRel, patchset: selPs, unixBuild: selUB };

        const method = showRequestOfKey === null ? "POST" : "PUT";

        fetch('api/PSRItems/', {
            method: method,
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
                const ef = document.getElementById("error-message");
                const messageItem = document.createElement('div');
                messageItem.textContent = error;
                ef.appendChild(messageItem);
                console.log(error);
            });

        if (showRequestOfKey !== null) {
            // this request was edited, switch back to list
            // if request is new, user can stay in editor and save another new request
            backToListCallback();
        }
    }

    const [gen, setGen] = useState();
    const [rel, setRel] = useState();
    const [ps, setPs] = useState();
    const [_, setUb] = useState<boolean>();

    const [selGen, setSelGen] = useState();
    const [selRel, setSelRel] = useState();
    const [selPs, setSelPs] = useState();
    const [selUB, setSelUB] = useState(true);

    const [releases, setReleases] = useState([]);
    const [spacks, setSPacks] = useState([]);

    async function handG(data) {
        setSPacks([]);
        setSelPs(undefined);
        setSelRel(undefined);
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
                result.splice(0, 0, "");
                setReleases(result);
            })
            .catch((error) => {
                document.getElementById("error-message").textContent = `${error}`;
            });
    };

    async function handR(data) {
        setSelPs(undefined);
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
                result.splice(0, 0, "");
                setSPacks(result);
            })
            .catch((error) => {
                document.getElementById("error-message").textContent = `${error}`;
            });
    };

async function handP(event) {
        const data = event.target.value;
        setSelPs(data);
        console.log("selected PS is " + data);
    };

    function handUB(event) {
        if (event.target.value === 'y')
            setSelUB(true);
        else
            setSelUB(false);
    }

    const relItems =
        releases.map((item) => <option key={item} value={item}>{item}</option>);
    const spackItems =
        spacks.map((item) => <option key={item} value={item}>{item}</option>);

    const editForm = <div id="editform">
        <div>
            <pre></pre>
            <label>select generation:</label>
            <select id="gen" value={gen} name="gen" onChange={e => handG(e.target.value)}>
                <option value=""></option>
                <option value="Forms">Forms</option>
                <option value="Desktop">Desktop</option>
            </select>
        </div>
        <div>
            <label>select release:</label>
            <select id="release" value={rel} name="release" onChange={e => handR(e.target.value)}>
                {relItems}
            </select>
        </div>
        <div>
            <label>select SP:</label>
            <select id="spack" value={ps} name="spack" onChange={handP}>
                {spackItems}
            </select>
        </div>
        <div>
            <label>
                Unix build
                <label><input type="radio" value="n" checked={selUB === false} onChange={handUB} />No</label>
                <label><input type="radio" value="y" checked={selUB === true} onChange={handUB} />Yes</label>
            </label>
        </div>
        <br></br>
        <div id="error-message"></div>
        <button id="saveButton" onClick={saveClicked}>Save request</button>
        <br></br>
        When user enters new requests, view will stay on editor after save.<br></br>
        Otherwise editor is "redirected" back to list view.
    </div>;

    async function LoadPsrs() {
        if (showRequestOfKey !== null) {
            const response = await fetch('api/PSRItems/' + showRequestOfKey);
            const data = await response.json();
            handG(data.gen);
            setGen(data.gen);
            setSelGen(data.gen);
            handR(data.release);
            setRel(data.release);
            setSelRel(data.release);
            setPs(data.patchset);
            setSelPs(data.patchset);
            if (data.unixBuild) {
                setUb(true);
                setSelUB(true);
            } else {
                setUb(false);
                setSelUB(false);
            }
        }
    }

    useEffect(() => {
        LoadPsrs();
    }, []);

    return (<>
        {editForm}
    </>);
}
//"gen": "Forms",
//    "release": "20.0.5",
//        "patchset": "20.0.5-0120",
//            "unixBuild": true

export default PsrEditor;