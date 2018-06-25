"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var teamServices_1 = require("../models/services/teamServices");
var constant_1 = require("../models/constants/constant");
var validateM_1 = require("./validateM");
var TeamM = /** @class */ (function () {
    function TeamM() {
    }
    TeamM.getMyTeams = function (req, callback) {
        var userId = req.thisUser.id;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        teamServices_1.TeamS.getMyTeams(userId, offset, limit)
            .then(function (teams) {
            callback({ success: true, code: 200, message: null, data: teams });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.searchTeams = function (req, callback) {
        var userId = req.thisUser.id;
        var name = req.validData.name;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        teamServices_1.TeamS.searchTeams(userId, offset, limit, name)
            .then(function (teams) {
            callback({ success: true, code: 200, message: null, data: teams });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.getTeamMembers = function (req, callback) {
        var userId = req.thisUser.id;
        var teamId = req.validData.teamId;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        teamServices_1.TeamS.getTeamMembers(userId, teamId, offset, limit)
            .then(function (members) {
            //console.log(members);
            callback({ success: true, code: 200, message: null, data: members });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.getTeamAnnouncement = function (req, callback) {
        var userId = req.thisUser.id;
        var teamId = req.validData.teamId;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        teamServices_1.TeamS.getTeamAnnouncement(teamId, userId, offset, limit)
            .then(function (announcements) {
            callback({ success: true, code: 200, message: null, data: announcements });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.getTeamProjects = function (req, callback) {
        var teamId = req.validData.teamId;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        teamServices_1.TeamS.getTeamProjects(teamId, offset, limit)
            .then(function (projects) {
            callback({ success: true, code: 200, message: null, data: projects });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.getTeamProfile = function (req, callback) {
        var teamId = req.validData.teamId;
        teamServices_1.TeamS.getTeam(teamId)
            .then(function (team) {
            callback({ success: true, code: 200, message: null, data: team });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    // manging meethods
    //*************************************************** */
    TeamM.announceAndReply = function (req, callback) {
        var userId = req.thisUser.id;
        var teamId = req.validData.teamId;
        var message = req.validData.message;
        var mainAnnouncementId = null;
        if (req.validData.hasOwnProperty('mainAnnouncementId')) {
            mainAnnouncementId = req.validData.mainAnnouncementId;
        }
        teamServices_1.TeamS.announceAndReply(teamId, userId, message, mainAnnouncementId)
            .then(function (announcement) {
            callback({ success: true, code: 200, message: null, data: announcement });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.reply = function (req, callback) {
        var userId = req.thisUser.id;
        var message = req.validData.message;
        var mainAnnouncementId = req.validData.mainAnnouncementId;
        var teamId = req.validData.teamId;
        teamServices_1.TeamS.reply(userId, teamId, message, mainAnnouncementId)
            .then(function (announcementId) {
            callback({ success: true, code: 200, message: null, data: announcementId });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.updateAnnouncementSeen = function (req, callback) {
        var userId = req.thisUser.id;
        var teamId = req.validData.teamId;
        var lastSeenAnnouncementId = req.validData.lastSeenAnnouncementId;
        teamServices_1.TeamS.updateAnnouncementSeen(teamId, userId, lastSeenAnnouncementId)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.addNewTeam = function (req, callback) {
        var userId = req.thisUser.id;
        var teamData = validateM_1.ValidateM.validateNewTeam(userId, req.validData);
        teamServices_1.TeamS.newTeam(teamData)
            .then(function (team) {
            console.log(team);
            callback({ success: true, code: 200, message: null, data: team });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.addTeamMember = function (req, callback) {
        var memberIds = req.validData.memberIds;
        var teamId = req.validData.teamId;
        console.log("Members======================================================");
        console.log(memberIds);
        teamServices_1.TeamS.addTeamMember(teamId, memberIds)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.removeTeamMember = function (req, callback) {
        var memberIds = req.validData.memberIds;
        var teamId = req.validData.teamId;
        console.log("Working=========================================");
        teamServices_1.TeamS.removeTeamMember(teamId, memberIds)
            .then(function (status) {
            console.log(status);
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.replyTeamJoinRequest = function (req, callback) {
        var accepted = req.validData.accepted;
        var decision = 'Rejected';
        var requestId = req.validData.requestId;
        if (accepted) {
            decision = constant_1.UserConst.REQUEST.ACCEPTED;
        }
        else {
            decision = constant_1.UserConst.REQUEST.REJECTED;
        }
        teamServices_1.TeamS.replyTeamJoinRequest(requestId, decision)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.editAnnouncementReply = function (req, callback) {
        var announcementId = req.validData.announcementId;
        var newAnnouncement = req.validData.newAnnouncement;
        teamServices_1.TeamS.editAnnouncementReply(announcementId, newAnnouncement)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.deleteAnnouncement = function (req, callback) {
        var announcementId = req.validData.announcementId;
        teamServices_1.TeamS.removeAnnouncement(announcementId)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.deleteReply = function (req, callback) {
        var replyId = req.validData.replyId;
        teamServices_1.TeamS.removeReply(replyId)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.editTeamProfile = function (req, callback) {
        var teamId = req.validData.teamId;
        var teamData = req.validData.teamData;
        teamServices_1.TeamS.editTeamProfile(teamId, teamData)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    TeamM.deleteTeam = function (req, callback) {
        var teamId = req.validData.teamId;
        teamServices_1.TeamS.deleteTeam(teamId)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    // extra========================================================================
    TeamM.getUnseenAnnouncements = function (req, callback) {
        var homeReturn = [];
        var userId = req.thisUser.id;
        teamServices_1.TeamS.getUnseenAnnouncements(userId)
            .then(function (announcements) {
            homeReturn = announcements;
            callback({ success: true, code: 200, message: null, data: homeReturn });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    return TeamM;
}());
exports.TeamM = TeamM;
