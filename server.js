const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/message", async (req, res) => {
    const userMessage = req.query.q;
    try {
        const response = await fetch(`https://supun-md-api-xmjh.vercel.app/api/ai?q=${encodeURIComponent(userMessage)}`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ success: false, error: "API call failed", details: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));