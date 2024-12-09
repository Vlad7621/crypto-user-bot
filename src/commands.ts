import { TelegramClient } from 'telegram';
import { EntityLike, MessageLike } from 'telegram/define';


export const sendMessage = async (
    client: TelegramClient,
    entity: EntityLike,
    message: MessageLike
): Promise<void> => {
    await client.sendMessage(entity, {
        message: message
    });
};