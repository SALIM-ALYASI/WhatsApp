const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();
app.use(express.json());

const client = new Client();
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Web is ready!');
});

client.initialize();

app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;
    const chatId = `${number}@c.us`;
    client.sendMessage(chatId, message)
        .then(response => res.status(200).json({ success: true, response }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});

app.listen(3000, () => console.log('Server running on port 3000'));
