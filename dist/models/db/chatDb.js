"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db/db");
var constant_1 = require("../constants/constant");
var ChatDb = /** @class */ (function () {
    function ChatDb() {
    }
    ChatDb.getLastSeenTime = function (friendId) {
        return db_1.DB.UserLog.findOne({
            where: {
                userId: friendId,
                logOutTime: null
            }
        });
    };
    ChatDb.getContactId = function (userId, friendIds, request) {
        if (request === void 0) { request = ''; }
        return db_1.DB.Contact.findAll({
            where: db_1.DB.Sequelize.or(db_1.DB.Sequelize.and({
                userId: userId,
                friendId: {
                    in: friendIds
                },
            }, db_1.DB.Sequelize.or({
                request: constant_1.UserConst.REQUEST.ACCEPTED
            }, {
                request: {
                    like: request == '' ? '%%' : "%" + request + "%"
                }
            })), db_1.DB.Sequelize.and({
                userId: {
                    in: friendIds
                },
                friendId: userId,
            }, db_1.DB.Sequelize.or({
                request: constant_1.UserConst.REQUEST.ACCEPTED
            }, {
                request: {
                    like: request == '' ? '%%' : "%" + request + "%"
                }
            }))),
        });
    };
    ChatDb.getMessages = function (userId, contactIds, seen, lastMsgId) {
        return db_1.DB.Message.findAll({
            where: db_1.DB.Sequelize.or(db_1.DB.Sequelize.and({
                id: {
                    gt: lastMsgId
                },
                contactId: {
                    in: contactIds
                },
                seen: false
            }), db_1.DB.Sequelize.and({
                id: {
                    gt: lastMsgId
                },
                contactId: {
                    in: contactIds
                },
                seen: seen
            })),
            order: [['id', 'DESC']],
            attributes: ['id', 'message', 'seen', 'senderId', 'timestamp']
        });
    };
    // message received
    // friend, team, project join request
    // task assignment
    ChatDb.getMessageNotification = function (friendsId) {
        return db_1.DB.Message.findAll({
            where: {
                senderId: {
                    in: friendsId
                },
                seen: false
            },
            include: [{
                    model: db_1.DB.User,
                    include: [db_1.DB.Skill]
                }]
        });
    };
    // authorization
    ChatDb.checkFriendship = function (userId, friendId) {
        return db_1.DB.Contact.findOne({
            where: db_1.DB.Sequelize.or({
                userId: userId,
                friendId: friendId,
                request: constant_1.UserConst.REQUEST.ACCEPTED
            }, {
                userId: friendId,
                friendId: userId,
                request: constant_1.UserConst.REQUEST.ACCEPTED
            })
        });
    };
    ChatDb.checkMessageSender = function (userId, messageId) {
        return db_1.DB.Message.findOne({
            where: {
                id: messageId,
                senderId: userId
            }
        });
    };
    ChatDb.checkMessageRecSend = function (contactId, messageId) {
        return db_1.DB.Message.findOne({
            where: {
                id: messageId,
                contactId: contactId
            }
        });
    };
    ChatDb.checkUserOwnsContactId = function (userId, contactId) {
        // return DB.Contact.findOne({
        //     where:DB.Sequelize.or([
        //         {
        //             id:contactId,
        //             userId:userId
        //         },{
        //             id:contactId,
        //             friendId:userId
        //         }
        //     ])            
        // })
        return db_1.DB.Contact.findById(contactId);
    };
    return ChatDb;
}());
exports.ChatDb = ChatDb;
