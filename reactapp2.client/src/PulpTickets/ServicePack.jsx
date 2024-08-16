import React, {useState, useEffect} from "react";
import {DataJsonService} from './DataJsonService.ts';
function ServicPack(){
    const [pm, setPm] = useState([]);
    function hpmchange(event){
        setPm(event.target.value);
        console.log("hpmchange end");
    }

    async function loadReleases() {
        console.log("-------- loadReleases");
        const service = new DataJsonService();
        service.GetReleases()
            .then((response) => {
                if (!response.ok) { throw new Error(`HTTP error: ${response.status}`); }
                return response.json();
            })
            .then((result) => {
                console.log(result);
                result.splice(0, 0, "-select-");
                setPm(result);
            })
            .catch((error) => {
                console.log("loadReleases():" + error);
            });
    };

    useEffect(() => { loadReleases(); }, []);

    return(<div>
        <select value={pm} onChange={hpmchange} name="" id="">
            {pm.map((item) => <option key={item} value={item}>{item}</option>)}        
        </select>
        <p>payment: {pm}</p>
    </div>)
}
export default ServicPack