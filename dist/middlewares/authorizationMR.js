"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chatServices_1 = require("../models/services/chatServices");
var teamServices_1 = require("../models/services/teamServices");
var projectServices_1 = require("../models/services/projectServices");
var userServices_1 = require("../models/services/userServices");
var constant_1 = require("../models/constants/constant");
var Authorization = /** @class */ (function () {
    function Authorization() {
    }
    // verify if the user is the recipient of the friend request
    Authorization.verifyFriendRequestReceiver = function (req) {
        var userId = req.thisUser.id;
        var requestId = req.validData.requestId;
        return userServices_1.UserS.checkFriendRequestReceiver(userId, requestId)
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    // ============================================================================================
    // chat
    Authorization.verifyFriendship = function (req) {
        var userId = req.thisUser.id;
        var friendId = req.validData.friendId;
        return chatServices_1.ChatS.checkFriendship(userId, friendId)
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    Authorization.verifyMessageSender = function (req) {
        var userId = req.thisUser.id;
        var messageId = req.validData.messageId;
        return chatServices_1.ChatS.checkMessageSender(userId, messageId)
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    Authorization.verifyMessageReceiver = function (req) {
        var userId = req.thisUser.id;
        var friendId = req.validData.friendId;
        var messageId = req.validData.messageId;
        chatServices_1.ChatS.getContactId(userId, friendId, constant_1.UserConst.REQUEST.ACCEPTED)
            .then(function (contactId) {
            if (contactId) {
                return Promise.all([chatServices_1.ChatS.checkMessageSender(userId, messageId), chatServices_1.ChatS.checkMessageRecSend(contactId, messageId)]);
            }
            return false;
        })
            .then(function (result) {
            if (result && (!result[0] || result[1])) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    Authorization.verifyMessageRecSend = function (req) {
        var userId = req.thisUser.id;
        var friendId = req.validData.friendId;
        var messageId = req.validData.messageId;
        chatServices_1.ChatS.getContactId(userId, friendId, constant_1.UserConst.REQUEST.ACCEPTED)
            .then(function (contactId) {
            if (contactId) {
                return chatServices_1.ChatS.checkMessageRecSend(contactId, messageId);
            }
            return false;
        })
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    Authorization.verifyMessageRecSendNew = function (req) {
        var userId = req.thisUser.id;
        var messageId = req.validData.messageId;
        return chatServices_1.ChatS.getContactIdFromMessageId(messageId)
            .then(function (contactId) {
            console.log("Contact id===============================");
            console.log(contactId);
            if (contactId) {
                return chatServices_1.ChatS.checkMessageRecSendNew(contactId, messageId);
            }
            return false;
        })
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    // teams
    Authorization.verifyTeamLeadership = function (req) {
        var userId = req.thisUser.id;
        var teamId = req.validData.teamId;
        return teamServices_1.TeamS.checkTeamLeadership(userId, teamId)
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    Authorization.verifyTeamMembership = function (req) {
        var userId = req.thisUser.id;
        var teamId = req.validData.teamId;
        return teamServices_1.TeamS.checkTeamMembership(userId, teamId)
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    Authorization.verifyAnnouncementOrReplyOwnership = function (req) {
        var userId = req.thisUser.id;
        var announcementId = 0;
        if (req.validData.hasOwnProperty('announcementId')) {
            announcementId = req.validData.announcementId;
        }
        else if (req.validData.hasOwnProperty('replyId')) {
            announcementId = req.validData.replyId;
        }
        return teamServices_1.TeamS.checkAnnouncementOrReplyOwnership(userId, announcementId)
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    // verify if the user is the recipient of the team join request
    Authorization.verifyTeamJoinRequestReceiver = function (req) {
        var userId = req.thisUser.id;
        var requestId = req.validData.requestId;
        return teamServices_1.TeamS.checkTeamJoinRequestReceiver(userId, requestId)
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    // project
    Authorization.verifyProjectLeadership = function (req) {
        var userId = req.thisUser.id;
        var projectId = req.validData.projectId;
        return projectServices_1.ProjectS.checkProjectLeadership(userId, projectId)
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    Authorization.verifyProjectContributor = function (req) {
        var userId = req.thisUser.id;
        var projectId = req.validData.projectId;
        return projectServices_1.ProjectS.checkContributor(userId, projectId)
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    // verify if the user is the recipient of the individual project join request
    Authorization.verifyIndividualContributorRequestReceiver = function (req) {
        var userId = req.thisUser.id;
        var requestId = req.validData.requestId;
        return projectServices_1.ProjectS.checkIndividualContributorRequestReceiever(userId, requestId)
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    // verify if the user is the leader of the recipient team of the team project join request
    Authorization.verifyTeamContributorRequestReceiver = function (req) {
        var userId = req.thisUser.id;
        var requestId = req.validData.requestId;
        return projectServices_1.ProjectS.checkTeamContributorRequestReceiever(userId, requestId)
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    // verify if a task is assigned to a user
    Authorization.verifyTaskAssignee = function (req) {
        var userId = req.thisUser.id;
        var taskId = req.validData.taskId;
        return projectServices_1.ProjectS.checkTaskAssignee(userId, taskId)
            .then(function (status) {
            if (status) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    // verify if a task is assigned to a user
    Authorization.verifyTaskAssignable = function (req) {
        var userId = req.thisUser.id;
        var assigneeId = req.validData.assigneeId;
        var teamId = req.validData.teamId;
        var projectId = req.validData.projectId;
        return Promise.all([projectServices_1.ProjectS.checkProjectLeadership(userId, projectId), projectServices_1.ProjectS.checkTeamContributor(teamId, projectId), teamServices_1.TeamS.checkTeamMembership(assigneeId, teamId)])
            .then(function (result) {
            if (result[0] && result[1] && result[2]) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    return Authorization;
}());
exports.Authorization = Authorization;
