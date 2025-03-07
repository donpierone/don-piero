const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "INSERISCI_LA_TUA_CHIAVE";

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        if (!userMessage) {
            return res.status(400).json({ error: "Messaggio mancante" });
        }

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4-turbo",
                messages: [{ role: "system", content: "Sei Don Piero, un saggio sacerdote virtuale." }, { role: "user", content: userMessage }]
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore nel server" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ Server attivo su http://localhost:${port}`);
});
