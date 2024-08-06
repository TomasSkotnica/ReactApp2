export type IdNameItem = {
    id?: number;
    name: string;
}

export type ComboBoxIdNameProps<IdNameItem> = { options: IdNameItem[], onOptionSelection: (item: IdNameItem) => void };

export type SpSearchIdCriteria = {
    fltGeneration?: number,
}

export type SpSearchPanelProps = {
    searchClicked: (criteria: SpSearchIdCriteria) => void,
};

