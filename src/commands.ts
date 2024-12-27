import { TelegramClient } from 'telegram';
import { EntityLike, MessageIDLike, MessageLike } from 'telegram/define';


export const sendMessage = async (
    client: TelegramClient,
    entity: EntityLike,
    message: MessageLike
): Promise<void> => {
    await client.sendMessage(entity, {
        message: message
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