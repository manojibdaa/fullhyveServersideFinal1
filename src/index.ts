import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import { Authentication } from "./middlewares/authenticationM";
import * as bodyParser from "body-parser";
import { MainTest } from './test/mainTest';
import { Validation } from "./models/util/validate";
import { RealtimeServer } from './controllers/realtimeServer';
import { UploadR } from './controllers/uploadRoute';

export class MainServer {
  public static readonly PORT: number = 8000;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private realtimeServer: RealtimeServer;
  private port: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.initRoutes();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || MainServer.PORT;
  }

  private sockets(): void {
    this.realtimeServer = new RealtimeServer(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });
  }

  private initRoutes() {
    this.app.use(express.static('.'));
    this.app.use(bodyParser.urlencoded());
    this.app.use(bodyParser.json());
    this.app.use(express.static('public/images/'));


    this.app.use(function (req:express.Request, res:express.Response, next:express.NextFunction) {
      res.header("Access-Control-Allow-Origin", '*');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      next();
    });

    this.app.use('/file', UploadR.init());

    // uncomment to initialize database with seed data
    // MainTest.init();
  }
}
new MainServer();