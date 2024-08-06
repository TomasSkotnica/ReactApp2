
import { IdNameItem, ComboBoxIdNameProps } from "./../../../lib/PulpTicketsTypes.ts";

export default function ComboBoxIdName<IdNameItem>({ options, onOptionSelection }: ComboBoxIdNameProps<IdNameItem>) {
    function SendSelectedOption(value: string) {
        onOptionSelection(options.filter(o => o.name === value)[0]);
    }
    return (
        <div>
            <label>select from items:</label>
            <select onChange={e => SendSelectedOption(e.target.value)}>
                {options.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
            </select>
        </div>
    );
}

