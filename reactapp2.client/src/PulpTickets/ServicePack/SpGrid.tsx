
import { PsrItem } from './PsrItem.ts';
import SpGridRow from './SpGridRow.tsx';

interface SpGridProps {
    rows: Array<PsrItem>
    fltGeneration:string,
}

function SpGrid(props: SpGridProps) {
    const rowsToDisplay = [];
    props.rows.forEach((item) => {
        rowsToDisplay.push(<SpGridRow item={item} key={item.patchset}></SpGridRow>);
    });

  return (
      <table>
          <thead>
              <tr key="header">
                  <th>Generation</th>
                  <th>Release</th>
                  <th>Service pack</th>
                  <th>Unix build</th>
              </tr>
          </thead>
          <tbody>{rowsToDisplay}</tbody>
      </table>
  );
}

export default SpGrid;