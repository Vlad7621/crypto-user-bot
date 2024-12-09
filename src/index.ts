import { NewMessage } from 'telegram/events';
import { authClient } from './client';
import { eventMessage } from './message';


(async () => {
    const client = await authClient();
    client.addEventHandler(async event =>
        await eventMessage(event, client), new NewMessage({
            chats: [7362664019]
        })
    );
})();