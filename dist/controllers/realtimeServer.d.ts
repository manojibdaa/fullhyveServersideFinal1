/// <reference types="node" />
import { Server } from 'http';
export declare class RealtimeServer {
    private io;
    static socketMain: any;
    constructor(server: Server);
    private initiateSockets(server);
    private parseData(data);
    private authenticateRequest(socket, data, next);
    private validateRequest(socket, data, next);
    private checkAuthority(socket, data, next);
    private listen();
    static isFriendOnline(friendId: number): boolean;
}
