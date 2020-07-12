import { checkConnection, getUpdate } from './telegram-api';
import { CYCLE_DELAY_MS } from './constants';
import { createServer } from './server';
const main = async () => {
    if (!await checkConnection()) {
        return;
    }

    setTimeout(getUpdate, CYCLE_DELAY_MS);
    console.log('Working...')

    createServer();
}

main();
