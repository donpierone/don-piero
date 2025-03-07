const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Benvenuto su Don Piero! Il server è attivo.");
});

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});
