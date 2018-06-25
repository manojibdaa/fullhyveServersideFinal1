"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db/db");
var constant_1 = require("../constants/constant");
var UserDb = /** @class */ (function () {
    function UserDb() {
    }
    UserDb.getByUserName = function (userName) {
        return db_1.DB.User.findOne({
            where: {
                userName: userName
            }
        });
    };
    UserDb.getUser = function (userId) {
        return db_1.DB.User.findById(userId, {
            include: [db_1.DB.Skill]
        });
    };
    // manage user
    UserDb.newUser = function (userData) {
        return db_1.DB.User.create(userData);
    };
    UserDb.modifyUser = function (userId, userData) {
        console.log(userData);
        return new Promise(function (resolve, reject) {
            return db_1.DB.Skill.destroy({
                where: {
                    userId: userId
                }
            }).then(function () {
                return db_1.DB.User.update(userData, {
                    where: {
                        id: userId
                    }
                });
            })
                .then(function () {
                return db_1.DB.Skill.bulkCreate(userData.skills);
            })
                .then(function () {
                resolve();
            });
        });
    };
    UserDb.setUserImage = function (userId, imageUrl) {
        return db_1.DB.User.update({
            imageUrl: imageUrl,
        }, {
            where: {
                id: userId
            }
        });
    };
    UserDb.addFriend = function (userId, friendId) {
        return db_1.DB.Contact.create({
            userId: userId,
            friendId: friendId
        });
    };
    UserDb.replyFriendRequest = function (requestId, decision) {
        return db_1.DB.Contact.update({
            request: decision,
            seen: true
        }, {
            where: {
                id: requestId
            }
        });
    };
    UserDb.removeFriend = function (requestId) {
        return db_1.DB.Contact.destroy({
            where: {
                id: requestId
            }
        });
    };
    UserDb.logout = function (userId) {
        return db_1.DB.UserLog.update({
            logOutTime: new Date()
        }, {
            where: {
                userId: userId
            }
        });
    };
    UserDb.getUnseenFriendRequests = function (userId) {
        return db_1.DB.Contact.findAll({
            where: {
                friendId: userId,
                request: constant_1.UserConst.REQUEST.UNDECIDED
            }
        });
    };
    UserDb.getSenders = function (userIds) {
        return db_1.DB.User.findAll({
            where: {
                id: {
                    in: userIds
                }
            }
        });
    };
    // authorization
    UserDb.checkFriendRequestReceiver = function (userId, requestId) {
        return db_1.DB.Contact.findOne({
            where: {
                id: requestId,
                friendId: userId
            }
        });
    };
    return UserDb;
}());
exports.UserDb = UserDb;
