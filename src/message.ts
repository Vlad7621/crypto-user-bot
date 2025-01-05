import { NewMessageEvent } from 'telegram/events';
import { TelegramClient } from 'telegram';
import { sendMessage, sendPhoto } from './commands';
import { MessageIDLike } from 'telegram/define';
import { CHANNEL_ID, DCA_CHANNEL_ID, NEWS_BOT_ID } from './constans';
import { parseMessage } from './helpers/parse-message';
import { validation } from './helpers/validation';
import { formatMessage } from './helpers/format-message';


let photos: MessageIDLike[] = [];
let timeout: NodeJS.Timeout | undefined;
async function eventMessage(event: NewMessageEvent, client: TelegramClient): Promise<void> {
    const { message } = event;
    const id = event.chatId?.valueOf();

    const replyMsg = await message.getReplyMessage();
    if (!id || !!replyMsg) return;

    const entity = id === NEWS_BOT_ID ? '@RawenNewsPro_bot' : id;
    const fromEntity = await client.getEntity(entity);

    const channel = await client.getEntity(CHANNEL_ID);

    if (message.photo) {
        photos.push(message.id);
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(async () => {
            await sendPhoto(client, channel, fromEntity, photos);
            photos = [];
        }, 3000);
    } else {
        if (id === DCA_CHANNEL_ID) {
            const parsedMessage = parseMessage(message.text);

            const isValid = validation(
                parsedMessage.frequency,
                parsedMessage.potential,
                parsedMessage.eta,
                parsedMessage.futures
            );

            if(isValid) {
                const channel = await client.getEntity(-1002167526471);
                await client.sendMessage(channel, {
                    message: formatMessage(parsedMessage),
                    parseMode: 'html',
                    linkPreview: false
                });
            }
        } else {
            await sendMessage(client, channel, fromEntity, message);
        }
    }
}

export { eventMessage };