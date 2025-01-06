import { NewMessageEvent } from 'telegram/events';
import { TelegramClient } from 'telegram';
import { sendMessage, sendPhoto } from './commands';
import { MessageIDLike } from 'telegram/define';
import { CHANNEL_ID, DCA_CHANNEL_ID, NEWS_BOT_ID } from './constans';
import { parseMessage } from './helpers/parse-message';
import { validation } from './helpers/validation';
import { formatMessage } from './helpers/format-message';
import { db } from './database/firebase';
import { firestore } from 'firebase-admin';

let photos: MessageIDLike[] = [];
let timeout: NodeJS.Timeout | undefined;
async function eventMessage(event: NewMessageEvent, client: TelegramClient): Promise<void> {
    const { message } = event;
    const id = event.chatId?.valueOf();

    const replyMsg = await message.getReplyMessage();

    if (!!replyMsg && id === DCA_CHANNEL_ID) {
        if (message.rawText === 'DCA closed by user') {
            const doc = await db.doc(`dca_messages/${message.replyToMsgId}`).get();
            const data = doc.data();
            
            if(!doc.exists) return;
            
            const channel = await client.getEntity(CHANNEL_ID);
            // const [msg] = await client.getMessages(
            //     channel, 
            //     {
            //         ids: data?.messageId
            //     }
            // );
            // console.log(msg)

            await client.sendMessage(channel, {
                message: 'DCA closed by user',
                replyTo: data?.messageId
            });
            await db.doc(`dca_messages/${message.replyToMsgId}`).delete();
        }
    }

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

            if (isValid) {
                const channel = await client.getEntity(-1002167526471);
                try {
                    const msg = await client.sendMessage(channel, {
                        message: formatMessage(parsedMessage),
                        parseMode: 'html',
                        linkPreview: false
                    });

                    const createdAt = firestore.FieldValue.serverTimestamp();
                    await db.doc(`dca_messages/${message.id}`).create({
                        messageId: msg.id,
                        // createdAt
                    });
                } catch (err) {
                    console.log(err)
                }
            }
        } else {
            await sendMessage(client, channel, fromEntity, message);
        }
    }
}

export { eventMessage };