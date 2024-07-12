//import React from 'react';
import { useEffect, useState } from 'react';

function PsrOne() {
    const [releases, setReleases] = useState(["xxxxxxxx"]);
    async function handG(event) {
        const data = event.target.value;
        console.log("passed value is " + data);
        //         const response = await fetch('api/TodoItems/releases'); // it is OK
        //                 'If-Modified-Since': 'Tue, 21 Nov 2000 08:00:00 GMT'
        // GET 'https://localhost:5173/api/PSRItems/releases' returns 304 Not modified
        fetch('https://localhost:5173/api/PSRItems/releases', {
            method: 'POST',
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
        //console.log(result);
        //setReleases(result);
        //setReleases(["20.0.1", "20.0.2"]);
    };

    const relItems =
        releases.map((item) => <option key={item} value={item}>{item}</option>);

    const psr = <div>
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
            <select id="release" name="release">
                {relItems}
            </select>
        </div>
    </div>;

  return (<>
      {psr}</>
  );
}

export default PsrOne;