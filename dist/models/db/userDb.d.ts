export declare class UserDb {
    static getByUserName(userName: any): any;
    static getUser(userId: any): any;
    static newUser(userData: any): any;
    static modifyUser(userId: any, userData: any): Promise<{}>;
    static setUserImage(userId: any, imageUrl: any): any;
    static addFriend(userId: any, friendId: any): any;
    static replyFriendRequest(requestId: any, decision: any): any;
    static removeFriend(requestId: number): any;
    static logout(userId: any): any;
    static getUnseenFriendRequests(userId: any): any;
    static getSenders(userIds: any): any;
    static checkFriendRequestReceiver(userId: number, requestId: number): any;
}
