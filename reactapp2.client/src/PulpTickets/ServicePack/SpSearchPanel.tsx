import { useState } from 'react';
export interface SpSearchPanelProps {
    searchClicked: (criteria: SpSearchCriteria) => void,
};

///////////////////////////////////////////////////////////
// moved - copied to ServicePack.tsx

function SpSearchPanel(props: SpSearchPanelProps) {
    const [fltGeneration, set_fltGeneration] = useState('');

    function handlerSearch(e) {
        let crit: SpSearchCriteria = { fltGeneration: fltGeneration };

        props.searchClicked(crit);
    }

    return (
        <div className="psronemain-menu">
            <button onClick={handlerSearch}>Search</button>
            <button onClick={handlerSearch}>TODO: Show Selected</button>
            <input type="text" value={fltGeneration} onChange={(e) => set_fltGeneration(e.target.value)} placeholder="Generation to search" />
        </div>
    );
}

// export default SpSearchPanel;