const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.get("/orders", async (req, res) => {
    // Fetch clients with their orders from the database.
});

app.post("/orders", async (req, res) => {
    // Insert client and orders into the database.
});

app.listen(4000, () => console.log("Server running on port 4000"));
