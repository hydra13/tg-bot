import { writeFile } from 'fs';

import { sendMsg } from "../telegram-api";
import { CommandsMapper } from "../types";

let pomodoro = 0;

const savePomodoroInStorage = async (pomodoroCount: number): Promise<void> => {
    const dateObj = new Date();
    const dateToday = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
    writeFile(`storage_${dateToday}.txt`, `${pomodoroCount}`, console.log);
}

const addPomodoro = async (chatId: string | number, messageId?: number): Promise<void> => {
    pomodoro++;
    sendMsg(chatId, `Помидорка добавлена. Итого: ${pomodoro}`, messageId);
    savePomodoroInStorage(pomodoro);
}
const getPomodoro = async (chatId: string | number, messageId?: number): Promise<void> => {
    sendMsg(chatId, `Итого помидорок: ${pomodoro}`, messageId);
}
const resetPomodoro = async (chatId: string | number, messageId?: number): Promise<void> => {
    pomodoro = 0;
    sendMsg(chatId, `Помидороки сброшены`, messageId);
    savePomodoroInStorage(pomodoro);
}

const pomodoroCommands: CommandsMapper = {
    '/add_pomodoro': addPomodoro,
    '/get_pomodoro': getPomodoro,
    '/reset_pomodoro': resetPomodoro
}

export default pomodoroCommands;