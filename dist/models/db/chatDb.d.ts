export declare class ChatDb {
    static getLastSeenTime(friendId: number): any;
    static getContactId(userId: number, friendIds: number[], request?: string): Promise<any>;
    static getMessages(userId: number, contactIds: number[], seen: boolean, lastMsgId: number): any;
    static getMessageNotification(friendsId: any): any;
    static checkFriendship(userId: number, friendId: number): any;
    static checkMessageSender(userId: number, messageId: number): any;
    static checkMessageRecSend(contactId: number, messageId: number): any;
    static checkUserOwnsContactId(userId: number, contactId: number): any;
}
