const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


app.use(cors());
app.use(bodyParser.json());

app.get("/orders", async (req, res) => {
    try {
        const clients = await prisma.client.findMany({
            include: { orders: true },
        });
        res.json(clients);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to retrieve orders" });
    }
});


app.post('/orders', async (req, res) => {
    try {
        console.log('Received request data:', req.body); // Логування запиту
        const { clientId, clientName, orderName } = req.body;

        if (!orderName || (!clientId && !clientName)) {
            return res.status(400).json({ error: 'Order name and client information are required.' });
        }

        let client;

        if (clientId) {
            client = await prisma.client.findUnique({
                where: { id: parseInt(clientId) },
            });
        } else {
            client = await prisma.client.create({
                data: { name: clientName },
            });
        }

        const order = await prisma.order.create({
            data: {
                name: orderName,
                clientId: client.id,
            },
        });

        res.status(201).json({ client, order });
    } catch (error) {
        console.error('Error in POST /orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(4000, () => console.log("Server running on port 4000"));
