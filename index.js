const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "INSERISCI_LA_TUA_CHIAVE";

// Endpoint per la chat
app.post("/chat", async (req, res) => {
    console.log("Richiesta ricevuta su /chat:", req.body);
    try {
        const userMessage = req.body.message;
        
        if (!userMessage) {
            console.log("Messaggio mancante!");
            return res.status(400).json({ error: "Messaggio mancante" });
        }

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4-turbo",
                messages: [
                    { role: "system", content: "Sei Don Piero, un saggio sacerdote virtuale." },
                    { role: "user", content: userMessage }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Risposta OpenAI:", response.data);
        res.json({ response: response.data.choices[0].message.content });

    } catch (error) {
        console.error("Errore nel server:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Errore nel server" });
    }
});

// Imposta la porta del server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ Server attivo su http://localhost:${port}`);
});

// Endpoint di base per verificare che il server sia attivo
app.get("/", (req, res) => {
    res.send("Benvenuto su Don Piero! Il server è attivo.");
});
