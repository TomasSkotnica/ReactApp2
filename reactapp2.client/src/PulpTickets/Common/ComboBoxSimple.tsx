export type ComboBoxSimpleProps = {
    options: [],
    selected: any,
    onOptionSelection: (item: any) => void
};

function ComboBoxSimple(props: ComboBoxSimpleProps) {
  return (
      <div>
          <label>select release:</label>
          <select id="search-release" value={props.selected} name="release" onChange={e => props.onOptionSelection(e.target.value)}>
              {props.options.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
      </div>
  );
}

export default ComboBoxSimple;