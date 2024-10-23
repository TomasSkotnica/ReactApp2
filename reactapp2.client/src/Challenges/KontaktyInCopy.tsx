import { useEffect, useState } from 'react';

function KontaktyInCopy() {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        populateContactData();
    }, []);

    const kontaktyGrid = challenges === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        :
        <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>id</th>
                </tr>
            </thead>
            <tbody>
                {challenges.map(ch =>
                    <tr key={ch.id}>
                        <td>{ch.id}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
        KONTAKTY IN Copy
            {kontaktyGrid}
        </div>
    );

    async function populateContactData() {
        const response = await fetch('https://localhost:5173/api/Contacts');
        const data = await response.json();
        setChallenges(data);
    }
}

export default KontaktyInCopy;