import React from 'react';
import { useEffect, useState } from 'react';
import RefreshContactsButton from './RefreshContactsButton.tsx';

function Kontakty() {
    const [contacts, setContacts] = useState([]);
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        populateContactData();
    }, []);

    const handleSubmit = async () => {
        const toSaveContact = {name: name1, surname: name2, email: email, phone: phone};

        const response = await fetch('api/TodoItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(toSaveContact),
        });

        const result = await response.json();
        console.log(result);
        populateContactData();
    };

    function name1Change(event) {
        setName1(event.target.value);
    }
    function name2Change(event) { setName1(event.target.value); };
    function emailChange(event) { setEmail(event.target.value); };
    function phoneChange(event) { setPhone(event.target.value); };


    const editForm =
        <form action="javascript:void(0);" method="POST" onSubmit={handleSubmit}>
            <p>
                <label>Name</label>
                <input type="text" id="add-name1" value={name1} onChange={name1Change} placeholder="" />
            </p>
            <input type="submit" id="add-button" value="Add" />
        </form>;

    const kontaktyGrid = contacts === undefined
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
            {editForm}
            {kontaktyGrid}
        </div>
    );

    async function populateContactData() {
        const response = await fetch('api/TodoItems');
        const data = await response.json();
        setContacts(data);
    }
}

export default Kontakty;