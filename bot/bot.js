
const TelegramBot = require('node-telegram-bot-api');

// Thay thế 'YOUR_TELEGRAM_BOT_TOKEN' bằng token của bạn
const token = '7832036660:AAGo1qEgm7n-2WDbfCzEQReXte8GyBuJPqM';
const bot = new TelegramBot(token, { polling: true });

// Các lựa chọn cho trò chơi Kéo Búa Bao
const choices = ['Kéo', 'Búa', 'Bao'];

// Hàm xác định kết quả
function getResult(userChoice, botChoice) {
    if (userChoice === botChoice) return "Hòa rồi!";
    if (
        (userChoice === 'Kéo' && botChoice === 'Bao') ||
        (userChoice === 'Búa' && botChoice === 'Kéo') ||
        (userChoice === 'Bao' && botChoice === 'Búa')
    ) return "Bạn thắng!";
    return "Bot thắng!";
}

// Lắng nghe tin nhắn từ người dùng
bot.onText(/\/play (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userChoice = match[1];
    
    // Kiểm tra lựa chọn của người dùng có hợp lệ không
    if (!choices.includes(userChoice)) {
        bot.sendMessage(chatId, "Vui lòng chọn 'Kéo', 'Búa', hoặc 'Bao'. Ví dụ: /play Kéo");
        return;
    }

    // Bot chọn ngẫu nhiên
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = getResult(userChoice, botChoice);

    // Phản hồi kết quả
    bot.sendMessage(chatId, `Bạn chọn: ${userChoice}\nBot chọn: ${botChoice}\nKết quả: ${result}`);
});

// Gửi hướng dẫn khi người dùng bắt đầu với lệnh /start
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Chào mừng bạn đến với trò chơi Kéo Búa Bao! Hãy nhập /play và lựa chọn của bạn (Kéo, Búa, Bao). Ví dụ: /play Kéo");
});
