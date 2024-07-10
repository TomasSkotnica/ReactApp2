//import React from 'react';
import { useEffect, useState } from 'react';

function PsrOne() {
    const [releases, setReleases] = useState(["xxxxxxxx"]);
    async function handG(event) {
        const data = event.target.value;
        console.log("passed value is " + data);
//         const response = await fetch('api/TodoItems/releases'); // it is OK
        const response = await fetch('api/PSRItems/releases');
        const result = await response.json();
        console.log(result);
        setReleases(result);
        //setReleases(["20.0.1", "20.0.2"]);
    };

    const relItems =
        releases.map((item) => <option value={item}>{item}</option>);

    const psr = <div>
        <div>
            <label for="gen">select generation:</label>
            <select id="gen" name="gen" onChange={handG}>
                <option value="1">Forms</option>
                <option value="3">Desktop</option>
            </select>
        </div>

        <div>
            <label for="release">select release:</label>
            <select id="release" name="release">
                {relItems}
            </select>
        </div>
    </div>;

  return (
      <p>{psr}</p>
  );
}

export default PsrOne;