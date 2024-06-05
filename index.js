
const TelegramApi = require("node-telegram-bot-api")

const token = "7400493186:AAEF1f8wal2ujE3GKliAQ5k0LCXS9WhtgUI"

const bot = new TelegramApi(token, { polling: true })

bot.setMyCommands([
    {
        command: "/hello",
        description: "send hello"
    },
    {
        command: "beach",
        description: "dont tolk about bad things"
    },
    {
        command: "/game",
        description: "name of the game? guess the number"
    }
])

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: "1",
                    callback_data: "1"
                },
                {
                    text: "2",
                    callback_data: "2"
                },
                {
                    text: "3",
                    callback_data: "3"
                },
                {
                    text: "4",
                    callback_data: "4"
                }
            ],
            [
                {
                    text: "5",
                    callback_data: "5"
                }
            ]
        ]
    })
}

const restartgameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: "restart the game",
                    callback_data: "/again"
                }
            ]
        ]
    })
}

let random_number = "fuck"

bot.on("message", async msg => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === "/hello") {
        return bot.sendMessage(chatId, `hello good boy how are you'`)
    }
    if (text === "/beach") {
        return bot.sendMessage(chatId, "in this place you can't tolk this word")
    }
    if (text === "/game") {
        random_number = Math.round(Math.random() * 10)
        // random_number = 1
        return bot.sendMessage(chatId, "you need to gues my number from 0 to 10", gameOptions)
        // if (text === random_number) {
        //     return bot.sendMessage(chatId, "my congratulations boy you guess my number")
        // } else {
        //     return bot.sendMessage(chatId, "sorry boy you don't guess my number")
        // }
    }

    return bot.sendMessage(chatId, "i dont understand you boy")
})

bot.on("callback_query", async msg => {
    const data = msg.data
    const chatId = msg.message.chat.id

    if (data == "/again") {
        random_number = Math.round(Math.random() * 10)
        return bot.sendMessage(chatId, "you need to gues my number from 0 to 10", gameOptions)
    }

    if (data == random_number) {
        return bot.sendMessage(chatId, `fuck ${random_number}`, restartgameOptions)
    } else {
        return bot.sendMessage(chatId, `no ${random_number}`, restartgameOptions)
    }
})