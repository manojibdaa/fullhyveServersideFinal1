"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var realtimeServer_1 = require("./controllers/realtimeServer");
var uploadRoute_1 = require("./controllers/uploadRoute");
var MainServer = /** @class */ (function () {
    function MainServer() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.initRoutes();
        this.listen();
    }
    MainServer.prototype.createApp = function () {
        this.app = express();
    };
    MainServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    MainServer.prototype.config = function () {
        this.port = process.env.PORT || MainServer.PORT;
    };
    MainServer.prototype.sockets = function () {
        this.realtimeServer = new realtimeServer_1.RealtimeServer(this.server);
    };
    MainServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
    };
    MainServer.prototype.initRoutes = function () {
        this.app.use(express.static('.'));
        this.app.use(bodyParser.urlencoded());
        this.app.use(bodyParser.json());
        this.app.use(express.static('public/images/'));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", '*');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            next();
        });
        this.app.use('/file', uploadRoute_1.UploadR.init());
        // uncomment to initialize database with seed data
        // MainTest.init();
    };
    MainServer.PORT = 8000;
    return MainServer;
}());
exports.MainServer = MainServer;
new MainServer();
