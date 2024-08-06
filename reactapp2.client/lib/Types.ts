export type IdNameItem = {
    id?: number;
    name?: string;
    desc?: string;
}

export type ComboBoxIdNameProps<IdNameItem> = { options: IdNameItem[], onOptionSelection: (item: IdNameItem) => void };