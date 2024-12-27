import { TelegramClient } from 'telegram';
import { EntityLike, MessageIDLike, MessageLike } from 'telegram/define';


export const sendMessage = async (
    client: TelegramClient,
    entity: EntityLike,
    fromEntity: EntityLike,
    message: MessageIDLike
): Promise<void> => {
    // await client.sendMessage(entity, {
    //     message: message,
    // });
    await client.forwardMessages(entity, {
        fromPeer: fromEntity,
        messages: message,
        dropAuthor: true
    });
};

export const sendPhoto = async (
    client: TelegramClient, 
    entity: EntityLike, 
    fromEntity: EntityLike, 
    photos: MessageIDLike[]
): Promise<void> => {
    await client.forwardMessages(entity, {
        fromPeer: fromEntity,
        messages: photos,
        dropAuthor: true
    });
}