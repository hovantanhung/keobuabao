const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

// Token bot từ Telegram BotFather
const token = '7832036660:AAGo1qEgm7n-2WDbfCzEQReXte8GyBuJPqM';
const bot = new TelegramBot(token, { polling: true });

// Xử lý lệnh từ người dùng
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Chào mừng bạn đến với trò chơi Kéo Búa Bao! Gửi 'keo', 'bua', hoặc 'bao' để chơi.");
});

// Xử lý các tin nhắn khác
bot.on('message', (msg) => {
    const userChoice = msg.text.toLowerCase();
    const choices = ['keo', 'bua', 'bao'];

    // Kiểm tra xem lựa chọn của người dùng có hợp lệ không
    if (choices.includes(userChoice)) {
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        let result;

        if (userChoice === botChoice) {
            result = "Hòa!";
        } else if (
            (userChoice === 'keo' && botChoice === 'bao') ||
            (userChoice === 'bua' && botChoice === 'keo') ||
            (userChoice === 'bao' && botChoice === 'bua')
        ) {
            result = "Bạn thắng!";
        } else {
            result = "Bot thắng!";
        }

        bot.sendMessage(msg.chat.id, `Bạn chọn: ${userChoice}\nBot chọn: ${botChoice}\nKết quả: ${result}`);
    } else {
        // Nếu lựa chọn không hợp lệ, thông báo cho người dùng
        bot.sendMessage(msg.chat.id, "Lựa chọn không hợp lệ! Hãy gửi 'keo', 'bua', hoặc 'bao' để chơi.");
    }
});

app.listen(3000, () => {
    console.log('Server chạy trên cổng 3000');
});
