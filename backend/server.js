require("dotenv").config();
const express = require("express");
const cors = require("cors");
const emailjs = require("@emailjs/nodejs"); // EmailJS für Server

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware für JSON-Verarbeitung und CORS
app.use(express.json());
app.use(cors());

// POST-Route zum Senden der E-Mail
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, {
            from_name: name,
            from_email: email,
            message: message
        }, {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            privateKey: process.env.EMAILJS_PRIVATE_KEY // Sicherer als im Frontend
        });

        res.status(200).json({ success: true, message: "E-Mail wurde erfolgreich gesendet!" });
    } catch (error) {
        console.error("Fehler beim Senden:", error);
        res.status(500).json({ success: false, message: "Fehler beim Senden der Nachricht." });
    }
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
