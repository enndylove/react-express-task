import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClientTable from './components/ClientTable';
import OrderForm from "./components/OrderForm";

function App() {
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:4000/orders');
            setClients(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleOrderAdded = async (newOrderData) => {
        setClients(prevClients => [...prevClients, newOrderData]);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div>
            <OrderForm clients={clients} onOrderAdded={handleOrderAdded} />
            <h1>Client Orders</h1>
            <ClientTable clients={clients} />
        </div>
    );
}

export default App;
