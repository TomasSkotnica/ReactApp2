import { useState } from 'react';

import SpSearchPanel from './SpSearchPanel.tsx';
import SpGrid from './SpGrid.tsx';

const fakerows = [
    { gen: "Forms", release: "19.0.0", unixbuild: true, patchset: "19.0.0-0200" },
    { gen: "Forms", release: "19.0.5", unixbuild: true, patchset: "19.0.5-0050" },
    { gen: "Forms", release: "18.0.0", unixbuild: false, patchset: "18.0.0-0100" },
    { gen: "Desktop", release: "20.0.0", unixbuild: true, patchset: "20.0.0-0010" },
    { gen: "Desktop", release: "20.0.1", unixbuild: false, patchset: "20.0.1-0020" },
    { gen: "Desktop", release: "20.0.1", unixbuild: true, patchset: "20.0.1-0010" }
];


function ServicePack() {
    const [fltGeneration, set_fltGeneration] = useState('');

    function searchClicked() {
        console.log("Search clicked");
    }

    return (
        <div>
            <SpSearchPanel
                searchClicked={searchClicked}
                fltGeneration={fltGeneration}
                onGenerationChange={set_fltGeneration}
            />
            <p>Search for {fltGeneration}</p>
            <SpGrid
                rows={fakerows}
                fltGeneration={fltGeneration}
            />
        </div>
    );
}

export default ServicePack;