import axios from 'axios';

import {
    TGUpdateMsg,
    TGMessage
} from './types';
import { DEF_USER_ID } from './constants';

const { BOT_TOKEN = '' } = process.env;
const { USER_ID = DEF_USER_ID } = process.env;
const URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

let offset = 0;

export const checkConnection = async (): Promise<boolean> => {
    try {
        const res = await axios.get(`${URL}/getMe`)
        return res.status === 200;
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        return false;
    }
}


const authCheck = (msg: TGMessage): boolean => {
    return msg.from.id === USER_ID;
}

const sendMsg = async (chatId: number | string, text: string, msgId?: number) => {
    try {
        const res = await axios.post(`${URL}/sendMessage`, {
            chat_id: chatId,
            text,
            message_id: msgId
        });
        console.log(res.status);
        console.log(res.statusText);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
    }
}

export const getUpdate = async () => {
    try {
        const limit = 100;
        const timeout = 0;
        const allowed_updates: string | string[] = [];
        const res = await axios.post(`${URL}/getUpdates`, {
            offset, limit, timeout, allowed_updates
        })
        const messages: TGUpdateMsg[] = res.data.result;
        messages.forEach(msg => {
            const { message, update_id } = msg;
            if (authCheck(message)) {
                switch (message.text) {
                    case '/start':
                        sendMsg(message.chat.id, 'Добро пожаловать!', message.message_id);
                        break;
                    case '/help':
                        sendMsg(message.chat.id, 'Кто бы мне помог :-)', message.message_id);
                        break;
                    default:
                        sendMsg(message.chat.id, 'Неизвестная команда', message.message_id);
                }
            }
            offset = Math.max(offset, update_id + 1);
        })
        setTimeout(getUpdate, 1000);
    } catch (err) {
        console.log(`ERROR: ${err.message}`)
        console.log('Closing program...')
        process.exit(1);
    }
}