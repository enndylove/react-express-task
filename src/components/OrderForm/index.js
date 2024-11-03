import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ clients, onOrderAdded }) => {
    const [clientName, setClientName] = useState('');
    const [orderName, setOrderName] = useState('');
    const [selectedClientId, setSelectedClientId] = useState('');

    const handleClientChange = (e) => {
        setSelectedClientId(e.target.value);
        setClientName('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(clients)
        const payload = selectedClientId
            ? { clientId: selectedClientId, orderName }
            : { clientName, orderName };

        try {
            const response = await axios.post('http://localhost:4000/orders', payload);
            onOrderAdded(response.data);
            setOrderName('');
            setClientName('');
            setSelectedClientId('');
            window.location.reload()
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} key={clients}>
            <h3>Add New Order</h3>

            <label htmlFor="existingClient">Choose Existing Client</label>
            <select
                id="existingClient"
                value={selectedClientId}
                onChange={handleClientChange}
            >
                <option value="">-- Select Client --</option>
                {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                        {client.name}
                    </option>
                ))}
            </select>

            <p>Or create a new client:</p>
            <label htmlFor="clientName">Client Name</label>
            <input
                type="text"
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                disabled={selectedClientId}
            />

            <label htmlFor="orderName">Order Name</label>
            <input
                type="text"
                id="orderName"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                required
            />

            <button type="submit">Add Order</button>
        </form>
    );
};

export default OrderForm;
