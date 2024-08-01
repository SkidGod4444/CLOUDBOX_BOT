const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();
const axios = require("axios");

// Jokes array
const jokes = [
    
    "SUBSCRIBE MY MASTERS YT CHANNEL: https://www.youtube.com/channel/UC5pAe0zPiPCtFSZn5NwSvmg"
];

// Function to send a random message
// function sendRandomMessage(chatId, userInput, msg_id) {
//     const randomNumber = Math.random();
//     if (randomNumber < 2) {
//         const randomIndex = Math.floor(Math.random() * jokes.length);
//         const randomJoke = jokes[randomIndex];
//         bot.sendMessage(chatId, randomJoke, {
//             reply_to_message_id: msg_id,
//         });
//     } else {
//         bot.sendMessage(chatId, userInput, {
//             reply_to_message_id: msg_id,
//         });
//     }
// }

app.use(express.json());

// Replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT;

// Create a bot that uses 'webhook' to fetch new updates
const bot = new TelegramBot(token);
const url = process.env.URL || 'https://cloudbox-bot.vercel.app';
const port = process.env.PORT || 3339;

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${token}`);

app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

bot.onText(/\/getkey/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Your CloudKey is: ${chatId}`);
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Join Our Telegram Channel: https://t.me/cloudbox_storage`);
});

bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const userInput = msg.text;
    const msg_id = msg.message_id;

    // sendRandomMessage(chatId, userInput, msg_id);
});

app.listen(port, () => {
    console.log(`Server running at ${url}`);
});

module.exports = app;
