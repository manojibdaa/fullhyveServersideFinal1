"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chatServices_1 = require("../models/services/chatServices");
var realtimeServer_1 = require("../controllers/realtimeServer");
var ChatM = /** @class */ (function () {
    function ChatM() {
    }
    ChatM.getFriends = function (req, callback) {
        var userId = req.thisUser.id;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        chatServices_1.ChatS.getChatFriends(userId, offset, limit)
            .then(function (result) {
            console.log(result);
            callback({ success: true, code: 200, message: "Successfully fetched", data: result });
        }).catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ChatM.searchUsers = function (req, callback) {
        var userId = req.thisUser.id;
        var name = req.validData.name;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        chatServices_1.ChatS.searchUsers(userId, name, offset, limit)
            .then(function (result) {
            console.log(result);
            callback({ success: true, code: 200, message: "Successfully fetched", data: result });
        }).catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ChatM.getMessages = function (req, callback) {
        var userId = req.thisUser.id;
        var friendId = req.validData.friendId;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        chatServices_1.ChatS.getChatMessages(userId, friendId, offset, limit)
            .then(function (result) {
            console.log(result);
            callback({ success: true, code: 200, message: "Successfully fetched", data: result });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ChatM.updateSeen = function (req, callback) {
        var userId = req.thisUser.id;
        var lastMessageId = req.validData.lastMessageId;
        var contactIdR;
        chatServices_1.ChatS.getContactIdFromMessageId(lastMessageId)
            .then(function (contactId) {
            if (contactId) {
                contactIdR = contactId;
                return chatServices_1.ChatS.checkUserOwnsContactId(userId, contactId);
            }
            return null;
        })
            .then(function (isMessageRecSender) {
            if (isMessageRecSender) {
                return chatServices_1.ChatS.updateSeen(userId, contactIdR, lastMessageId);
            }
            else {
                callback({ success: true, code: 403, message: "Unauthorized access", data: null });
            }
        })
            .then(function () {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ChatM.sendMessage = function (req, callback) {
        var userId = req.thisUser.id;
        var friendId = req.validData.friendId;
        var message = req.validData.message;
        console.log("In send message");
        chatServices_1.ChatS.sendChatMessage(userId, friendId, message)
            .then(function (result) {
            if (realtimeServer_1.RealtimeServer.isFriendOnline(friendId)) {
                result['friendId'] = userId;
                console.log(result);
                realtimeServer_1.RealtimeServer.socketMain['/chat'].onlineUsers[friendId].emit('receiveMessageR', result);
            }
            callback({ success: true, code: 200, message: "Successfully sent", data: result });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ChatM.forwardMessage = function (req, callback) {
        var userId = req.thisUser.id;
        var friendIds = req.validData.friendIds;
        var messageId = req.validData.messageId;
        chatServices_1.ChatS.forwardMessage(userId, friendIds, messageId)
            .then(function (result) {
            callback({ success: true, code: 200, message: "Successfully fetched", data: result });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ChatM.editMessage = function (req, callback) {
        var messageId = req.validData.messageId;
        var content = req.validData.newMessage;
        chatServices_1.ChatS.editMessage(messageId, content)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ChatM.deleteMessage = function (req, callback) {
        var messageId = req.validData.messageId;
        chatServices_1.ChatS.deleteMessage(messageId)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ChatM.getFriendLastSeenTime = function (req, callback) {
        var friendId = req.validData.friendId;
        chatServices_1.ChatS.getFriendLastSeenTime(friendId)
            .then(function (response) {
            if (realtimeServer_1.RealtimeServer.isFriendOnline(friendId)) {
                callback({ success: true, code: 200, message: null, data: { online: true, timestamp: new Date().toISOString() } });
            }
            else {
                callback({ success: true, code: 200, message: null, data: response });
            }
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    // extra==========================================================================
    ChatM.getUnseenMessages = function (req, callback) {
        var homeReturn = [];
        var userId = req.thisUser.id;
        chatServices_1.ChatS.getUnseenReceivedMessages(userId)
            .then(function (messages) {
            homeReturn = messages;
            callback({ success: true, code: 200, message: null, data: homeReturn });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    return ChatM;
}());
exports.ChatM = ChatM;
