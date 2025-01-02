import { NewMessageEvent } from 'telegram/events';
import { TelegramClient } from 'telegram';
import { sendMessage, sendPhoto } from './commands';
import { MessageIDLike } from 'telegram/define';
import { CHANNEL_ID, COIN_CHANNEL_ID, NEWS_BOT_ID } from './constans';


let photos: MessageIDLike[] = [];
let timeout: NodeJS.Timeout | undefined;
async function eventMessage(event: NewMessageEvent, client: TelegramClient): Promise<void> {
    const { message } = event;
    const id = event.chatId?.valueOf();

    const replyMsg = await message.getReplyMessage();
    if(!!replyMsg) return;

    if (id === NEWS_BOT_ID || id === COIN_CHANNEL_ID) {
        const fromEntity = await client.getEntity(id);
        const channel = await client.getEntity(CHANNEL_ID);

        if (message.photo) {
            photos.push(message.id);
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(async () => {
                await sendPhoto(client, channel, fromEntity, photos);
                photos = [];
            }, 3000);
        } else {
            await sendMessage(client, channel, fromEntity, message);
        }
    }
}

export { eventMessage };