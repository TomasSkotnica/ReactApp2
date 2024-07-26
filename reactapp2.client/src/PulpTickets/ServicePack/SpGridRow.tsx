
function SpGridRow({ item}) {
  return (
      <tr key={item.patchset}>
          <td>{item.gen}</td>
          <td>{item.release}</td>
          <td>{item.patchset}</td>
          <td>{item.unixBuild ? 'Y' : 'N'}</td>
      </tr>
  );
}

export default SpGridRow;