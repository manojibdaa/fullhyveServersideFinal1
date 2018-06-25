"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userDb_1 = require("../db/userDb");
var util_1 = require("../util/util");
var UserS = /** @class */ (function () {
    function UserS() {
    }
    UserS.isUserNameAvailable = function (userName, callback) {
        return new Promise(function (resolve, reject) {
            userDb_1.UserDb.getByUserName(userName)
                .then(function (user) {
                if (user) {
                    callback({ success: false, code: 400, message: "Username is already used", data: null });
                }
                else {
                    resolve(true);
                }
            })
                .catch(function (err) {
                reject(500);
            });
        });
    };
    UserS.getUserProfile = function (userId) {
        return new Promise(function (resolve, reject) {
            userDb_1.UserDb.getUser(userId)
                .then(function (user) {
                var userReturn = {};
                if (user) {
                    userReturn = util_1.UtilMethods.getUserProfileAttr([user])[0];
                }
                resolve(userReturn);
            });
        });
    };
    UserS.getUnseenFriendRequests = function (userId) {
        return new Promise(function (resolve, reject) {
            var friendRequestsReturn = [];
            var friendsId = {};
            userDb_1.UserDb.getUnseenFriendRequests(userId)
                .then(function (contacts) {
                if (contacts.length > 0) {
                    for (var _i = 0, contacts_1 = contacts; _i < contacts_1.length; _i++) {
                        var contact = contacts_1[_i];
                        friendsId[contact.userId] = contact.id;
                    }
                    return userDb_1.UserDb.getSenders(Object.keys(friendsId));
                }
                return [];
            })
                .then(function (senders) {
                if (senders.length > 0) {
                    friendRequestsReturn = util_1.UtilMethods.getFriendRequestAttr(senders, friendsId);
                }
                resolve(friendRequestsReturn);
            });
        });
    };
    // managing methods
    UserS.addUser = function (user) {
        return new Promise(function (resolve, reject) {
            userDb_1.UserDb.newUser(user)
                .then(function () {
                resolve(201);
            })
                .catch(function (err) {
                reject(500);
            });
        });
    };
    UserS.addFriend = function (userId, friendId) {
        return userDb_1.UserDb.addFriend(userId, friendId);
    };
    UserS.replyFriendRequest = function (reqeustId, decision) {
        return userDb_1.UserDb.replyFriendRequest(reqeustId, decision);
    };
    UserS.unfriend = function (requestId) {
        return userDb_1.UserDb.removeFriend(requestId);
    };
    UserS.editUser = function (userId, user) {
        return new Promise(function (resolve, reject) {
            userDb_1.UserDb.modifyUser(userId, user)
                .then(function () {
                resolve(200);
            })
                .catch(function (err) {
                reject(500);
            });
        });
    };
    UserS.setUserImage = function (userId, imageUrl) {
        return userDb_1.UserDb.setUserImage(userId, imageUrl);
    };
    UserS.logout = function (userId) {
        return userDb_1.UserDb.logout(userId);
    };
    // authorization
    UserS.checkFriendRequestReceiver = function (userId, requestId) {
        return new Promise(function (resolve, reject) {
            userDb_1.UserDb.checkFriendRequestReceiver(userId, requestId)
                .then(function (request) {
                if (request) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    return UserS;
}());
exports.UserS = UserS;
