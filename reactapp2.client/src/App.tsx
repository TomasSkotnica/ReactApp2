import { useEffect, useState } from 'react';
import RefreshContactsButton from './RefreshContactsButton.tsx';
import './App.css';

interface Contact {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
}

function App() {

    const handleSubmit = async () => {
        const data = {
            id: 0,
            name: document.getElementById('add-name').value.trim(),
            surname: "hc-surname",
            email: "w.@w.cz",
            phone: "123"
        };

        const response = await fetch('api/TodoItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result);
        populateContactData();
    };

    const [contacts, setContacts] = useState<Contact[]>();

    useEffect(() => {
        populateContactData();
    }, []);

    const kontaktyMoje =
        <form action="javascript:void(0);" method="POST" onSubmit={handleSubmit}>
            <p>
                <label>Name</label>
                <input type="text" id="add-name" placeholder="new name to add"/>
            </p>
            <input type="submit" id="add-button" value="Add" />
        </form>;

    const kontakty = contacts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        :
        <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>surname</th>
                    <th>email</th>
                    <th>phone</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map(contact =>
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.name}</td>
                        <td>{contact.surname}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    const [releases, setReleases] = useState(["xxxxxxxx"]);
    async function handG(event) {
        const data = event.target.value;
        console.log("passed value is " + data);
        const response = await fetch('api/TodoItems/releases');
        const result = await response.json();
        console.log(result);
        setReleases(result);
        //setReleases(["20.0.1", "20.0.2"]);
    };

    const relItems = 
        releases.map((item) => <option value={item}>{item}</option>);    

    const psr = <div>
            <div>
                <label for="gen">select generation:</label>
                <select id="gen" name="gen" onChange={handG}>
                    <option value="1">Forms</option>
                    <option value="3">Desktop</option>
                </select>
            </div>

            <div>
                <label for="release">select release:</label>
            <select id="release" name="release">
                {relItems}
            </select>
            </div>
        </div>;


    return (
        <div>
            {psr}
        <a href="./rootPSR.html">Patchset request page</a>
            <RefreshContactsButton onClickH={populateContactData}></RefreshContactsButton>
            {kontaktyMoje}
            {kontakty}
            <h1 id="tabelLabel">Kontakty</h1>
        </div>
    );

    async function populateContactData() {
        //const re = await fetch('api/PSRItems/1');
        //const aa = await re.json();
        //console.log(aa);
        const response = await fetch('api/TodoItems');
        const data = await response.json();
        setContacts(data);
    }
}

export default App;