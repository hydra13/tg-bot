import { sendMsg } from "../telegram-api";
import { CommandsMapper } from "../types";

const startCommand = async (chatId: string | number, messageId?: number): Promise<void> => {
    sendMsg(chatId, 'Добро пожаловать!', messageId);
}

const helpCommand = async (chatId: string | number, messageId?: number): Promise<void> => {
    const msg = `
        Кто бы мне помог :-):
        /add_pomodoro
        /get_pomodoro
        /reset_pomodoro
    `
    sendMsg(chatId, msg, messageId);
}

const commands: CommandsMapper = {
    '/start': startCommand,
    '/help': helpCommand,
    '/ping': async (chatId: string | number, messageId?: number): Promise<void> => sendMsg(chatId, 'pong', messageId)
}

export default commands;