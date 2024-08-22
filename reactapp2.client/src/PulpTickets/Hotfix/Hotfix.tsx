import React, { useState, useEffect } from "react";
import { DataJsonService } from "./../Common/DataJsonService";
function ServicPack() {
    const [pm, setPm] = useState([]);
    const selected = '';
    const [x, setX] = useState('');
    function hpmchange(event) {
        setX(event.target.value);
        console.log("hpmchange end");
    }

    async function loadReleases() {
        console.log("-------- loadReleases");
        const service = new DataJsonService();
        service.GetReleases()
            .then((response) => {
                console.log("loadReleases() got response: " + response.ok);
                //if (!response.ok) { throw new Error(`HTTP error: ${response.status}`); }
                return response.json();
            })
            .then((result) => {
                console.log("list response.json(): ");
                console.log(result);
                result.splice(0, 0, "-select-");
                setPm(result);
            })
            .catch((error) => {
                console.log("loadReleases():" + error + " --- " + response.status);
            });
    };

    useEffect(() => { loadReleases(); }, []);

    return (<div>
        <select value={x} onChange={hpmchange} name="" id="">
            {pm.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <p>payment: x</p>
    </div>)
}
export default ServicPack