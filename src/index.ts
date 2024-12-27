import { NewMessage } from 'telegram/events';
import { authClient } from './client';
import { eventMessage } from './message';
import { COIN_CHANNEL_ID, NEWS_BOT_ID } from './constans';


(async () => {
    const client = await authClient();
    client.addEventHandler(async event =>
        await eventMessage(event, client), new NewMessage({
            chats: [NEWS_BOT_ID, COIN_CHANNEL_ID]
        })
    );
})();