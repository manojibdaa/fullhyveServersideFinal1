"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userM_1 = require("../middlewares/userM");
var authenticationM_1 = require("../middlewares/authenticationM");
var validateM_1 = require("../middlewares/validateM");
var authorizationM_1 = require("../middlewares/authorizationM");
var validate_1 = require("../models/util/validate");
// const routers:express.Router = express.Router();
// // no authentication
// routers.post('/signup', ValidateM.validateNewUser, Authentication.hashPassword, UserM.register);
// routers.post('/checkUserName', UserM.checkUsername);
// // authentication
// routers.post('/signin', Validation.validate, Authentication.createToken);
// routers.use(Authentication.verifyToken);
// routers.use(Validation.validate);
// routers.post('/signout', UserM.logout);
// routers.post('/editProfile', UserM.editProfile);
// routers.post('/addFriend', UserM.addFriend);
// routers.post('/replyFriendRequest/:decision', Authorization.verifyFriendRequestReceiver, UserM.replyFriendRequest);
// routers.post('/unfriend', Authorization.verifyFriendship, UserM.replyFriendRequest);
// routers.post('/getNotifications',  UserM.getNotifications);
// // ================================================================
// routers.post('/getProfile', Authentication.verifyToken, UserM.getProfile);
// routers.post('/getUserProfile',Authentication.verifyToken, UserM.getUserProfile);
// export = routers;
var AccountR = /** @class */ (function () {
    function AccountR() {
    }
    AccountR.init = function () {
        var routers = express.Router();
        routers.post('/signup', validateM_1.ValidateM.validateNewUser, authenticationM_1.Authentication.hashPassword, userM_1.UserM.register);
        routers.post('/checkUserName', userM_1.UserM.checkUsername);
        // authentication
        routers.post('/signin', validate_1.Validation.validate, authenticationM_1.Authentication.createToken);
        routers.use(authenticationM_1.Authentication.verifyToken);
        routers.use(validate_1.Validation.validate);
        routers.post('/signout', userM_1.UserM.logout);
        routers.post('/editProfile', userM_1.UserM.editProfile);
        routers.post('/addFriend', userM_1.UserM.addFriend);
        routers.post('/replyFriendRequest/:decision', authorizationM_1.Authorization.verifyFriendRequestReceiver, userM_1.UserM.replyFriendRequest);
        routers.post('/unfriend', authorizationM_1.Authorization.verifyFriendship, userM_1.UserM.replyFriendRequest);
        routers.post('/getNotifications', userM_1.UserM.getNotifications);
        // ================================================================
        routers.post('/getProfile', authenticationM_1.Authentication.verifyToken, userM_1.UserM.getProfile);
        routers.post('/getUserProfile', authenticationM_1.Authentication.verifyToken, userM_1.UserM.getUserProfile);
        return routers;
    };
    return AccountR;
}());
exports.AccountR = AccountR;
