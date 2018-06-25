export declare class MainServer {
    static readonly PORT: number;
    private app;
    private server;
    private io;
    private realtimeServer;
    private port;
    constructor();
    private createApp();
    private createServer();
    private config();
    private sockets();
    private listen();
    private initRoutes();
}
