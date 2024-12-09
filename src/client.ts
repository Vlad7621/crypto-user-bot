import { Logger, TelegramClient } from 'telegram';
import { StoreSession }  from 'telegram/sessions';
import { input } from './helpers/input';

const API_ID = 20698315;
const API_HASH = 'b8c2f53990ad646a1ef4d6375183d61b';

const session = new StoreSession(`./src/session`);
const client = new TelegramClient(session, API_ID, API_HASH, {
    connectionRetries: 5,
    deviceModel: 'Android',
    systemVersion: '4.16.30-vxCUSTOM',
    baseLogger: new Logger()
});

const authClient = async () => {
    await client.start({
        phoneNumber: async () => await input('Please enter your number: '),
        password: async () => await input('Please enter your password: '),
        phoneCode: async () => await input('Please enter the code you received: '),
        onError: err => console.log(err)
    });
    console.log('User is connected.');
    return client;
};

export { authClient };