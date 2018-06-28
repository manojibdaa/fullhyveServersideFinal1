"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serviceValues_1 = require("../models/serviceValues");
var constant_1 = require("../constants/constant");
var util_1 = require("../util/util");
var teamDb_1 = require("../db/teamDb");
var projectDb_1 = require("../db/projectDb");
var TeamS = /** @class */ (function () {
    function TeamS() {
    }
    TeamS.getTeam = function (teamId) {
        return new Promise(function (resolve, reject) {
            teamDb_1.TeamDb.getTeam(teamId)
                .then(function (team) {
                console.log(team);
                var teamReturn = null;
                if (team) {
                    teamReturn = util_1.UtilMethods.getTeamAttr([team])[0];
                }
                resolve(teamReturn);
            });
        });
    };
    // get ids of teams the user is either leader of or member of
    TeamS.getTeamIdList = function (userId) {
        return new Promise(function (resolve, reject) {
            var teamIdsReturn = [];
            teamDb_1.TeamDb.getLeaderTeam(userId)
                .then(function (teamIds) {
                if (teamIds.length > 0) {
                    for (var _i = 0, teamIds_1 = teamIds; _i < teamIds_1.length; _i++) {
                        var i = teamIds_1[_i];
                        teamIdsReturn.push(i.id);
                    }
                }
                return teamDb_1.TeamDb.getUserTeam(userId);
            })
                .then(function (teamIds) {
                if (teamIds.length > 0) {
                    for (var _i = 0, teamIds_2 = teamIds; _i < teamIds_2.length; _i++) {
                        var i = teamIds_2[_i];
                        teamIdsReturn.push(i.teamId);
                    }
                }
                resolve(teamIdsReturn);
            });
        });
    };
    TeamS.getMemberIdList = function (teamId) {
        return new Promise(function (resolve, reject) {
            teamDb_1.TeamDb.getTeam(teamId)
                .then(function (memberIds) {
                var memberIdsReturn = [];
                for (var _i = 0, _a = memberIds.members; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (i.TeamUsers.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                        memberIdsReturn.push(i.id);
                    }
                    console.log();
                }
                memberIdsReturn.push(memberIds.user.id);
                resolve(memberIdsReturn);
            });
        });
    };
    TeamS.getMyTeams = function (userId, offset, limit, name) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.TeamConst.TEAMS_SEARCH_LIMIT; }
        if (name === void 0) { name = ''; }
        var teams = [];
        var nameCriteria = name == null ? '' : name;
        return new Promise(function (resolve, reject) {
            TeamS.getTeamIdList(userId)
                .then(function (teamsId) {
                return teamDb_1.TeamDb.getTeamsDetail(teamsId, nameCriteria);
            })
                .then(function (teams) {
                var values = {
                    myTeams: teams,
                    count: 0
                };
                values = util_1.UtilMethods.sliceCustom(values, ["myTeams"], offset, limit);
                values.myTeams = util_1.UtilMethods.getTeamAttr(values.myTeams, serviceValues_1.SearchFor.Specific);
                console.log(values);
                resolve(values);
            });
        });
    };
    TeamS.searchTeams = function (userId, offset, limit, name) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.TeamConst.TEAMS_SEARCH_LIMIT; }
        if (name === void 0) { name = ''; }
        var teamsReturn = { teams: [], myTeams: [], count: 0 };
        var teams = [];
        var nameCriteria = name == null ? '' : name;
        return new Promise(function (resolve, reject) {
            TeamS.getTeamIdList(userId)
                .then(function (teamIds) {
                return Promise.all([teamDb_1.TeamDb.getTeamsDetail(teamIds, nameCriteria), teamDb_1.TeamDb.getPublicTeams(teamIds, nameCriteria)]);
            })
                .then(function (result) {
                var values = {
                    myTeams: result[0],
                    teams: result[1],
                    count: 0
                };
                values = util_1.UtilMethods.sliceCustom(values, ["myTeams", "teams"], offset, limit);
                values.myTeams = util_1.UtilMethods.getTeamAttr(values.myTeams);
                values.teams = util_1.UtilMethods.getTeamAttr(values.teams);
                resolve(values);
            });
        });
    };
    TeamS.getTeamMembers = function (userId, teamId, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.TeamConst.MEMBERS_SEARCH_LIMIT; }
        var memberReturn = { members: [], count: 0 };
        return new Promise(function (resolve, reject) {
            TeamS.getMemberIdList(teamId)
                .then(function (memberIds) {
                return teamDb_1.TeamDb.getTeamMembers(memberIds);
            })
                .then(function (members) {
                if (members && members.length > 0) {
                    memberReturn = util_1.UtilMethods.sliceCustom({ members: members, count: 0 }, ["members"], offset, limit);
                    memberReturn.members = util_1.UtilMethods.getUserAttr(memberReturn.members);
                }
                resolve(memberReturn);
                console.log(memberReturn);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    TeamS.getTeamAnnouncement = function (teamId, userId, offset, limit, lastAnnId) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.AnnouncementConst.ANNOUNCEMENT_SHOWN_ONCE; }
        if (lastAnnId === void 0) { lastAnnId = constant_1.AnnouncementConst.START_ID; }
        var lastSeenAnnIdR;
        var announcementsR = [];
        var announcementReturn = {};
        return new Promise(function (resolve, reject) {
            teamDb_1.TeamDb.getTeamAnnouncement([teamId], lastAnnId)
                .then(function (announcements) {
                announcementsR = announcements;
                return teamDb_1.TeamDb.getLastAnnId(teamId, userId);
            })
                .then(function (lastAnn) {
                var lastSeenAnnouncementId = constant_1.TeamConst.START_ID;
                if (lastAnn && announcementsR.length > 0) {
                    lastSeenAnnouncementId = lastAnn.lastSeenAnnouncementId;
                }
                announcementReturn = util_1.UtilMethods.sliceCustom({ announcements: announcementsR, count: 0 }, ["announcements"], offset, limit);
                announcementReturn.announcements = util_1.UtilMethods.getAnnouncementAttr(announcementReturn.announcements, userId, lastSeenAnnouncementId);
                resolve(announcementReturn);
            });
        });
    };
    TeamS.getUnseenTeamAnnouncement = function (teamId, userId, limit) {
        if (limit === void 0) { limit = constant_1.AnnouncementConst.ANNOUNCEMENT_SHOWN_ONCE; }
        return new Promise(function (resolve, reject) {
            var lastSeenAnnId = constant_1.TeamConst.START_ID;
            teamDb_1.TeamDb.getLastAnnId(teamId, userId)
                .then(function (lastAnn) {
                if (lastAnn) {
                    lastSeenAnnId = lastAnn.lastSeenAnnouncementId;
                    return teamDb_1.TeamDb.getTeamAnnouncement([teamId], lastSeenAnnId);
                }
            })
                .then(function (announcements) {
                var announcementReturn = [];
                if (announcements) {
                    announcementReturn = util_1.UtilMethods.getAnnouncementAttr(announcements, userId, lastSeenAnnId);
                }
                resolve(announcementReturn);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    TeamS.getTeamProjects = function (teamId, offset, limit) {
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.getTeamProjects(teamId)
                .then(function (team) {
                var projectsReturn = { projects: [], count: 0 };
                if (team) {
                    projectsReturn = util_1.UtilMethods.sliceCustom({ projects: team.projects, count: 0 }, ["projects"], offset, limit);
                    projectsReturn.projects = util_1.UtilMethods.getProjectAttr(projectsReturn.projects);
                }
                resolve(projectsReturn);
            });
        });
    };
    // managing methods
    TeamS.announceAndReply = function (teamId, userId, message, mainAnnouncementId) {
        return new Promise(function (resolve, reject) {
            teamDb_1.TeamDb.announce(teamId, userId, message, mainAnnouncementId)
                .then(function (announcement) {
                var newAnnouncement = util_1.UtilMethods.getNewAnnouncementAttr(announcement, userId);
                resolve(newAnnouncement);
            });
        });
    };
    TeamS.reply = function (userId, teamId, message, mainAnnouncementId) {
        return new Promise(function (resolve, reject) {
            teamDb_1.TeamDb.reply(userId, teamId, message, mainAnnouncementId)
                .then(function (announcement) {
                var newAnnouncement = util_1.UtilMethods.getNewAnnouncementAttr(announcement, userId);
                resolve(newAnnouncement);
            });
        });
    };
    TeamS.updateAnnouncementSeen = function (teamId, userId, lastSeenAnnId) {
        return teamDb_1.TeamDb.updateAnnouncementSeen(teamId, userId, lastSeenAnnId);
    };
    TeamS.newTeam = function (teamData) {
        return teamDb_1.TeamDb.newTeam(teamData)
            .then(function (team) {
            if (team) {
                return {
                    id: team.id,
                    name: team.name,
                    image: team.image,
                    focus: team.focus,
                    description: team.description,
                    memberCount: 0
                };
            }
            // let teamMembers:any = [];
            // let members:any = teamData.members;
            // for(let member of members){
            //     teamMembers.push({
            //         userId:member,
            //         teamId:team.id
            //     })
            // }
            // return TeamDb.addTeamMembers(teamMembers);
            return null;
        });
    };
    TeamS.editTeamProfile = function (teamId, teamData) {
        return teamDb_1.TeamDb.editTeamProfile(teamId, teamData);
    };
    TeamS.deleteTeam = function (teamId) {
        return teamDb_1.TeamDb.deleteTeam(teamId);
    };
    TeamS.addTeamMember = function (teamId, memberIds) {
        var userTeam = [];
        for (var _i = 0, memberIds_1 = memberIds; _i < memberIds_1.length; _i++) {
            var userId = memberIds_1[_i];
            userTeam.push({ userId: userId, teamId: teamId });
        }
        return teamDb_1.TeamDb.addTeamMembers(userTeam);
    };
    TeamS.removeTeamMember = function (teamId, userId) {
        console.log("Remove team members======================================================");
        return teamDb_1.TeamDb.removeTeamMember(teamId, userId);
    };
    TeamS.replyTeamJoinRequest = function (requestId, decision) {
        return teamDb_1.TeamDb.replyTeamJoinRequest(requestId, decision);
    };
    TeamS.editAnnouncementReply = function (announcementId, newAnnouncement) {
        return teamDb_1.TeamDb.editAnnouncementReply(announcementId, newAnnouncement);
    };
    TeamS.removeAnnouncement = function (announcementId) {
        return teamDb_1.TeamDb.removeAnnouncementReply(announcementId);
    };
    TeamS.removeReply = function (replyId) {
        return teamDb_1.TeamDb.removeAnnouncementReply(replyId, null);
    };
    // notification
    TeamS.getLastAnnIds = function (userId) {
        return new Promise(function (resolve, reject) {
            var lastSeenAnnIdsReturn = null;
            teamDb_1.TeamDb.getLastAnnIds(userId)
                .then(function (annIds) {
                if (annIds.length > 0) {
                    for (var _i = 0, annIds_1 = annIds; _i < annIds_1.length; _i++) {
                        var annId = annIds_1[_i];
                        lastSeenAnnIdsReturn[annId.teamId] = annId.lastSeenAnnouncementId;
                    }
                }
                resolve(lastSeenAnnIdsReturn);
            });
        });
    };
    TeamS.getUnseenAnnouncements = function (userId, limit) {
        if (limit === void 0) { limit = constant_1.AnnouncementConst.ANNOUNCEMENT_SHOWN_ONCE; }
        return new Promise(function (resolve, reject) {
            var lastSeenAnnIds = null;
            var announcementsReturn = [];
            TeamS.getLastAnnIds(userId)
                .then(function (lastAnnIds) {
                lastSeenAnnIds = lastAnnIds;
                return TeamS.getTeamIdList(userId);
            })
                .then(function (teamsId) {
                if (teamsId.length > 0) {
                    return teamDb_1.TeamDb.getUnseenNotificationAnnouncements(teamsId);
                }
                return [];
            })
                .then(function (announcements) {
                if (announcements.length > 0) {
                    for (var _i = 0, announcements_1 = announcements; _i < announcements_1.length; _i++) {
                        var announcement = announcements_1[_i];
                        var lastSeenAnnId = constant_1.AnnouncementConst.START_ID;
                        if (lastSeenAnnIds && lastSeenAnnIds.hasOwnProperty(announcement.teamId)) {
                            lastSeenAnnId = lastSeenAnnIds[announcement.teamId];
                        }
                        if (announcement.id > lastSeenAnnId) {
                            var ann = util_1.UtilMethods.getAnnouncementAttr([announcement], userId, lastSeenAnnId, false)[0];
                            delete ann.replies;
                            var announcementR = {
                                team: {
                                    id: announcement.team.id,
                                    name: announcement.team.name,
                                    image: announcement.team.imageUrl
                                },
                                announcement: ann
                            };
                            announcementsReturn.push(announcementR);
                        }
                    }
                }
                resolve(announcementsReturn);
            });
        });
    };
    TeamS.getUnseenTeamJoinRequests = function (userId) {
        return new Promise(function (resolve, reject) {
            var teamJoinRequestsReturn = [];
            var teamsId = {};
            teamDb_1.TeamDb.getUnseenTeamJoinRequests(userId)
                .then(function (requests) {
                if (requests.length > 0) {
                    for (var _i = 0, requests_1 = requests; _i < requests_1.length; _i++) {
                        var request = requests_1[_i];
                        teamsId[request.teamId] = request.id;
                    }
                    return teamDb_1.TeamDb.getTeams(Object.keys(teamsId));
                }
                return [];
            })
                .then(function (senders) {
                if (senders.length > 0) {
                    teamJoinRequestsReturn = util_1.UtilMethods.getTeamJoinRequestAttr(senders, teamsId);
                }
                resolve(teamJoinRequestsReturn);
            });
        });
    };
    // Authorization
    TeamS.checkTeamMembership = function (userId, teamId) {
        return new Promise(function (resolve, reject) {
            Promise.all([teamDb_1.TeamDb.checkTeamLeadership(userId, teamId), teamDb_1.TeamDb.checkTeamMembership(userId, teamId)])
                .then(function (result) {
                if (result[0] || result[1]) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    TeamS.checkTeamLeadership = function (userId, teamId) {
        return new Promise(function (resolve, reject) {
            teamDb_1.TeamDb.checkTeamLeadership(userId, teamId)
                .then(function (team) {
                if (team) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    TeamS.checkAnnouncementOrReplyOwnership = function (userId, annId) {
        return new Promise(function (resolve, reject) {
            teamDb_1.TeamDb.checkAnnouncementOrReplyOwnership(userId, annId)
                .then(function (announcement) {
                if (announcement) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    TeamS.checkTeamJoinRequestReceiver = function (userId, requestId) {
        return new Promise(function (resolve, reject) {
            teamDb_1.TeamDb.checkTeamJoinRequestReceiver(userId, requestId)
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
    return TeamS;
}());
exports.TeamS = TeamS;
