import axios from 'axios';

import {
    TGUpdateMsg,
    TGMessage
} from './types';
import { DEF_USER_ID, LIMIT, TIMEOUT } from './constants';

const { BOT_TOKEN = '' } = process.env;
const { USER_ID = DEF_USER_ID } = process.env;
const URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

import commands from "./commands";

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

export const sendMsg = async (chatId: number | string, text: string, msgId?: number) => {
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

const getUpdatesFromTG = async (): Promise<TGUpdateMsg[]> => {
    const allowed_updates: string | string[] = [];
    const res = await axios.post(`${URL}/getUpdates`, {
        offset, LIMIT, TIMEOUT, allowed_updates
    })

    return res.data.result;
}

export const getUpdate = async () => {
    try {
        const messages: TGUpdateMsg[] = await getUpdatesFromTG();
        messages.forEach(msg => {
            const { message, update_id } = msg;
            if (authCheck(message)) {

                if (commands.hasOwnProperty(message.text)) {
                    const fn: Function = commands[message.text];
                    fn(message.chat.id, message.message_id);
                } else {
                    sendMsg(message.chat.id, 'Неизвестная команда', message.message_id);
                }
            }
            offset = Math.max(offset, update_id + 1);
        })
        setTimeout(() => getUpdate(), 1000);
    } catch (err) {
        console.log(`ERROR: ${err.message}`)
        console.log('Closing program...')
        process.exit(1);
    }
}
