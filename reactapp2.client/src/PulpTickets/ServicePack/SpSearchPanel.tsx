export interface SpSearchPanelProps {
    searchClicked: () => void,
    fltGeneration: string,
    onGenerationChange: (value: string) => void,
};

function SpSearchPanel(props: SpSearchPanelProps) {

    return (
        <div className="psronemain-menu">
            <button onClick={props.searchClicked}>Search</button>
            <button onClick={props.searchClicked}>TODO: Show Selected</button>
            <input type="text" value={props.fltGeneration} onChange={(e) => props.onGenerationChange(e.target.value)} placeholder="Generation to search" />
        </div>
    );
}

export default SpSearchPanel;