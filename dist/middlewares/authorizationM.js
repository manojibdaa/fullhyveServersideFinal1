"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chatServices_1 = require("../models/services/chatServices");
var teamServices_1 = require("../models/services/teamServices");
var projectServices_1 = require("../models/services/projectServices");
var userServices_1 = require("../models/services/userServices");
var Authorization = /** @class */ (function () {
    function Authorization() {
    }
    // verify if the user is the recipient of the friend request
    Authorization.verifyFriendRequestReceiver = function (req, res, next) {
        var userId = req.thisUser.id;
        var requestId = req.validData.requestId;
        userServices_1.UserS.checkFriendRequestReceiver(userId, requestId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    // ============================================================================================
    // chat
    Authorization.verifyFriendship = function (req, res, next) {
        var userId = req.thisUser.id;
        var friendId = req.validData.friendId;
        chatServices_1.ChatS.checkFriendship(userId, friendId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    Authorization.verifyMessageSender = function (req, res, next) {
        var userId = req.thisUser.id;
        var messageId = req.validData.messageId;
        chatServices_1.ChatS.checkMessageSender(userId, messageId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    Authorization.verifyMessageReceiver = function (req, res, next) {
        var userId = req.thisUser.id;
        var contactId = req.validData.contactId;
        var messageId = req.validData.messageId;
        Promise.all([chatServices_1.ChatS.checkMessageSender(userId, messageId), chatServices_1.ChatS.checkMessageRecSend(contactId, messageId)])
            .then(function (result) {
            if (!result[0] || result[1]) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    Authorization.verifyMessageRecSend = function (req, res, next) {
        var contactId = req.validData.contactId;
        var messageId = req.validData.messageId;
        chatServices_1.ChatS.checkMessageRecSend(contactId, messageId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    // teams
    Authorization.verifyTeamLeadership = function (req, res, next) {
        var userId = req.thisUser.id;
        var teamId = req.validData.teamId;
        teamServices_1.TeamS.checkTeamLeadership(userId, teamId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    Authorization.verifyTeamMembership = function (req, res, next) {
        var userId = req.thisUser.id;
        var teamId = req.validData.teamId;
        teamServices_1.TeamS.checkTeamMembership(userId, teamId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    Authorization.verifyAnnouncementOrReplyOwnership = function (req, res, next) {
        var userId = req.thisUser.id;
        var announcementId = req.validData.annId;
        teamServices_1.TeamS.checkAnnouncementOrReplyOwnership(userId, announcementId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    // verify if the user is the recipient of the team join request
    Authorization.verifyTeamJoinRequestReceiver = function (req, res, next) {
        var userId = req.thisUser.id;
        var requestId = req.validData.requestId;
        teamServices_1.TeamS.checkTeamJoinRequestReceiver(userId, requestId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    // project
    Authorization.verifyProjectLeadership = function (req, res, next) {
        var userId = req.thisUser.id;
        var projectId = req.validData.projectId;
        projectServices_1.ProjectS.checkProjectLeadership(userId, projectId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    Authorization.verifyProjectContributor = function (req, res, next) {
        var userId = req.thisUser.id;
        var projectId = req.validData.projectId;
        projectServices_1.ProjectS.checkContributor(userId, projectId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    // verify if the user is the recipient of the individual project join request
    Authorization.verifyIndividualContributorRequestReceiver = function (req, res, next) {
        var userId = req.thisUser.id;
        var requestId = req.validData.requestId;
        projectServices_1.ProjectS.checkIndividualContributorRequestReceiever(userId, requestId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    // verify if the user is the leader of the recipient team of the team project join request
    Authorization.verifyTeamContributorRequestReceiver = function (req, res, next) {
        var userId = req.thisUser.id;
        var teamId = req.validData.teamId;
        var requestId = req.validData.requestId;
        projectServices_1.ProjectS.checkTeamContributorRequestReceiever(userId, teamId, requestId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    // verify if a task is assigned to a user
    Authorization.verifyTaskAssignee = function (req, res, next) {
        var userId = req.thisUser.id;
        var taskId = req.validData.taskId;
        projectServices_1.ProjectS.checkTaskAssignee(userId, taskId)
            .then(function (status) {
            if (status) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    // verify if a task is assigned to a user
    Authorization.verifyTaskAssignable = function (req, res, next) {
        var userId = req.thisUser.id;
        var assigneeId = req.validData.assigneeId;
        var teamId = req.validData.teamId;
        var projectId = req.validData.projectId;
        Promise.all([projectServices_1.ProjectS.checkProjectLeadership(userId, projectId), projectServices_1.ProjectS.checkTeamContributor(teamId, projectId), teamServices_1.TeamS.checkTeamMembership(assigneeId, teamId)])
            .then(function (result) {
            if (result[0] && result[1] && result[2]) {
                next();
            }
            else {
                res.status(401).send();
            }
        });
    };
    return Authorization;
}());
exports.Authorization = Authorization;
