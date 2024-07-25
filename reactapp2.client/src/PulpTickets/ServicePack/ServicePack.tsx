import { useState } from 'react';

import SpSearchPanel from './SpSearchPanel.tsx';
import SpGrid from './SpGrid.tsx';

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
            <SpGrid />
        </div>
    );
}

export default ServicePack;