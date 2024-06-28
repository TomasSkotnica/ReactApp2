import { useEffect, useState } from 'react';
import RefreshContactsButton from './RefreshContactsButton.tsx';
import './App.css';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
interface Contact {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
}

function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table></table>;

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const data = {
            id: 0,
            name: "hardcoded Name",
            surname: "hc-surname",
            email: "w.@w.cz",
            phone: "123"
        };

        const response = await fetch('https://localhost:7191/api/TodoItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result);
    };

    const [contacts, setContacts] = useState<Contact[]>();

    useEffect(() => {
        populateContactData();
    }, []);

    const kontaktyMoje =
        <form action="javascript:void(0);" method="POST" onSubmit={handleSubmit}>
            <p>
                <label>Name</label>
                <input type="text" id="add-name" />
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

    return (
        <div>
            <RefreshContactsButton onClickH={populateContactData}></RefreshContactsButton>
            {kontaktyMoje}
            {kontakty}
            <h1 id="tabelLabel">Weather forecast</h1>
        </div>
    );

    async function populateContactData() {
        const response = await fetch('api/TodoItems');
        const data = await response.json();
        setContacts(data);
    }
    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }
}

export default App;