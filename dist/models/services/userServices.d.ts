import { Identity } from "../models/serviceValues";
export declare class UserS {
    static isUserNameAvailable(userName: string, callback: any): Promise<boolean>;
    static getUserProfile(userId: any): Promise<Identity>;
    static getUnseenFriendRequests(userId: any): Promise<{}>;
    static addUser(user: any): Promise<number>;
    static addFriend(userId: any, friendId: any): any;
    static replyFriendRequest(reqeustId: any, decision: string): any;
    static unfriend(requestId: any): any;
    static editUser(userId: any, user: any): Promise<number>;
    static setUserImage(userId: any, imageUrl: any): any;
    static logout(userId: any): any;
    static checkFriendRequestReceiver(userId: number, requestId: number): Promise<boolean>;
}
