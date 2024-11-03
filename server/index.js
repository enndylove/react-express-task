const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

app.get("/orders", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.*, o.*
            FROM clients c
            LEFT JOIN Orders o ON c.id = o.client_id
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve orders" });
    }
});

app.post('/orders', async (req, res) => {
    try {
        console.log('Received request data:', req.body); // Log request data
        const { clientId, clientName, orderName } = req.body;

        if (!orderName || (!clientId && !clientName)) {
            return res.status(400).json({ error: 'Order name and client information are required.' });
        }

        let client;

        if (clientId) {
            const clientResult = await pool.query('SELECT * FROM clients WHERE id = $1', [parseInt(clientId)]);
            client = clientResult.rows[0];

            if (!client) {
                return res.status(404).json({ error: 'Client not found.' });
            }
        } else {
            const clientResult = await pool.query('INSERT INTO clients(name) VALUES($1) RETURNING *', [clientName]);
            client = clientResult.rows[0];
        }

        const orderResult = await pool.query('INSERT INTO orders(name, client_id) VALUES($1, $2) RETURNING *', [orderName, client.id]);
        const order = orderResult.rows[0];

        res.status(201).json({ client, order });
    } catch (error) {
        console.error('Error in POST /orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(4000, () => console.log("Server running on port 4000"));
