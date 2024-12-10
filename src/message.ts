import { NewMessageEvent } from 'telegram/events';
import { TelegramClient } from 'telegram';
import { sendMessage} from './commands';

async function eventMessage(event: NewMessageEvent, client: TelegramClient): Promise<void> {
    const { message } = event;
    const id = event.chatId?.valueOf();

    if(id === 7362664019) {
        const { text } = message;
        
        const channel = await client.getEntity(-1002480801931);
        await sendMessage(client, channel, text);
    }
}

export { eventMessage };