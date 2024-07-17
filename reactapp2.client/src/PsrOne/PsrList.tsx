import { useEffect, useState } from 'react';

import { PsrItem } from './PsrItem.ts';

function PsrList() {
    const [psrItems, setPsrItems] = useState<PsrItem[]>([]);

    async function LoadPsrItems() {
        const response = await fetch('api/PSRItems');
        const data = await response.json();
        setPsrItems(data);
    };

    useEffect(() => {
        LoadPsrItems();
    }, []);

    const psrTable =
        <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Generation</th>
                    <th>Release</th>
                    <th>Service Pack</th>
                    <th>Unix build</th>
                </tr>
            </thead>
            <tbody>
                {psrItems?.map(item =>
                    <tr key={item.patchset}>
                        <td>{item.gen}</td>
                        <td>{item.release}</td>
                        <td>{item.patchset}</td>
                        <td>{item.unixBuild ? 'Y' : 'N'}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (<>
        {psrTable}
    </>
    );
}

export default PsrList;