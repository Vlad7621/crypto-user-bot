import { NewMessageEvent } from 'telegram/events';
import { TelegramClient } from 'telegram';
import { sendMessage, sendPhoto } from './commands';
import { MessageIDLike } from 'telegram/define';
import { CHANNEL_ID, NEWS_BOT_ID } from './constans';


let photos: MessageIDLike[] = [];
let timeout: NodeJS.Timeout | undefined;
async function eventMessage(event: NewMessageEvent, client: TelegramClient): Promise<void> {
    const { message } = event;
    const id = event.chatId?.valueOf();

    if (id === NEWS_BOT_ID) {
        const channel = await client.getEntity(CHANNEL_ID);

        if (message.photo) {
            const newsBot = await client.getInputEntity(NEWS_BOT_ID);

            photos.push(message.id);
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(async () => {
                await sendPhoto(client, channel, newsBot, photos);
                photos = [];
            }, 3000);

        } else {
            const { text } = message;

            await sendMessage(client, channel, text);
        }
    }
}

export { eventMessage };