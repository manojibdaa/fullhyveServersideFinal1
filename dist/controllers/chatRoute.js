"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var chatM_1 = require("../middlewares/chatM");
var authorizationM_1 = require("../middlewares/authorizationM");
var ChatR = /** @class */ (function () {
    function ChatR() {
    }
    ChatR.init = function () {
        var routers = express.Router();
        routers.post('/getMessages', authorizationM_1.Authorization.verifyFriendship, chatM_1.ChatM.getMessages);
        routers.post('/getFriends', chatM_1.ChatM.getFriends);
        routers.post('/searchUsers', chatM_1.ChatM.searchUsers); // search all users including non friends
        routers.post('/updateMessageSeen', authorizationM_1.Authorization.verifyMessageReceiver, chatM_1.ChatM.updateSeen);
        routers.post('/sendMessage', authorizationM_1.Authorization.verifyFriendship, chatM_1.ChatM.sendMessage);
        routers.post('/editMessage', authorizationM_1.Authorization.verifyMessageSender, chatM_1.ChatM.editMessage);
        routers.post('/forwardMessage', authorizationM_1.Authorization.verifyMessageRecSend, chatM_1.ChatM.forwardMessage);
        routers.post('/deleteMessage', authorizationM_1.Authorization.verifyMessageSender, chatM_1.ChatM.deleteMessage);
        // to be added
        routers.post('/getFriendLastSeenTime', authorizationM_1.Authorization.verifyFriendship, chatM_1.ChatM.getFriendLastSeenTime);
        return routers;
    };
    return ChatR;
}());
exports.ChatR = ChatR;
// const routers:express.Router = express.Router();
// routers.post('/getMessages', Authorization.verifyFriendship, ChatM.getMessages);
// routers.post('/getFriends', ChatM.getFriends);
// routers.post('/searchUsers', ChatM.searchUsers);       // search all users including non friends
// routers.post('/updateMessageSeen', Authorization.verifyMessageReceiver, ChatM.updateSeen);
// routers.post('/sendMessage', Authorization.verifyFriendship, ChatM.sendMessage);
// routers.post('/editMessage', Authorization.verifyMessageSender, ChatM.editMessage);
// routers.post('/forwardMessage', Authorization.verifyMessageRecSend, ChatM.forwardMessage);
// routers.post('/deleteMessage', Authorization.verifyMessageSender, ChatM.deleteMessage);
// // to be added
// routers.post('/getFriendLastSeenTime', Authorization.verifyFriendship, ChatM.getFriendLastSeenTime);
// export = routers;
