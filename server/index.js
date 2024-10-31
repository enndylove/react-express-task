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
        res.status(500).json({ error: "Failed to retrieve orders" });
    }
});


app.post("/orders", async (req, res) => {
    const { clientName, orderName } = req.body;
    try {
        const client = await prisma.client.create({
            data: {
                name: clientName,
                orders: { create: [{ name: orderName }] },
            },
        });
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
});

app.listen(4000, () => console.log("Server running on port 4000"));
