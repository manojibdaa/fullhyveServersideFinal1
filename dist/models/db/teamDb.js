"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db/db");
var constant_1 = require("../constants/constant");
var TeamDb = /** @class */ (function () {
    function TeamDb() {
    }
    TeamDb.getTeam = function (teamId) {
        return db_1.DB.Team.findById(teamId, {
            // where:{
            //     id:teamId
            // },
            include: [{
                    model: db_1.DB.User,
                    as: 'members'
                }, {
                    model: db_1.DB.User,
                    include: [db_1.DB.Skill]
                }]
        });
    };
    // get teamIds the user is leader of
    TeamDb.getLeaderTeam = function (userId) {
        return db_1.DB.Team.findAll({
            attributes: ['id', 'name'],
            where: {
                leaderId: userId
            }
        });
    };
    // get teamIds the user is member of
    TeamDb.getUserTeam = function (userId) {
        return db_1.DB.TeamUser.findAll({
            attributes: ['teamId'],
            where: {
                userId: userId,
                request: constant_1.UserConst.REQUEST.ACCEPTED
            }
        });
    };
    // get userIds of members of the given team
    TeamDb.getMembersId = function (teamId) {
        return db_1.DB.TeamUser.findAll({
            attributes: ['userId'],
            where: {
                teamId: teamId,
                request: constant_1.UserConst.REQUEST.ACCEPTED
            }
        });
    };
    TeamDb.getTeamsDetail = function (teamsId, nameCriteria) {
        return db_1.DB.Team.findAll({
            where: {
                id: {
                    in: teamsId
                },
                name: {
                    like: "%" + nameCriteria + "%"
                }
            },
            include: [{
                    model: db_1.DB.User,
                    as: 'members'
                }, {
                    model: db_1.DB.User,
                    include: [db_1.DB.Skill]
                }, {
                    model: db_1.DB.Announcement
                }]
        });
    };
    // get teams public teams the user isn't member of
    /*static getPublicTeams(teamIds:any, name?:string, lastTeamId:any=0, limit:number=TeamConst.TEAMS_SEARCH_LIMIT){
        return DB.Team.findAll({
            attributes:['id','name','imageUrl','focus','description', 'visibility'],
            order:[['id','ASC']],
            where:{
                visibility:true,
                name:{
                    like:name==null||name==''?`%%`:`%${name}%`
                },
                id:DB.Sequelize.and({
                    gt:TeamConst.START_ID,
                },{
                    gt:lastTeamId
                },{
                    notIn:teamIds
                })
            },

            include:[{
                model:DB.User,
                attributes:['id','firstName','lastName','imageUrl','title', 'description'],
                include:[DB.Skill]
            },{
                model:DB.User,
                as:'members',
                attributes:['id'],
            }]
        })
    }*/
    // get teams the user is member of
    /*static getMyTeams(teamIds:any, name?:string, lastTeamId:any=TeamConst.START_ID, limit:number=TeamConst.TEAMS_SEARCH_LIMIT){
        return DB.Team.findAll({
            order:[['id','ASC']],
            attributes:['id','name','imageUrl','focus','description', 'visibility','status'],
            where:{
                name:{
                        like:name==null||name==''?`%%`:`%${name}%`
                    },
                    
                    id:DB.Sequelize.and({
                        in:teamIds
                    },{
                        gt:lastTeamId
                    })
            },
            include:[{
                model:DB.User,
                as:'members',
                attributes:['id'],
                include:[DB.Skill]
            },{
                model:DB.User,
                attributes:['id','firstName','lastName','imageUrl','title', 'description'],
                include:[DB.Skill]
            }]
        })
    }*/
    TeamDb.getTeamMembers = function (memberIds) {
        return db_1.DB.User.findAll({
            where: {
                id: {
                    in: memberIds
                }
            },
            include: [db_1.DB.Skill]
        });
    };
    TeamDb.getTeamAnnouncement = function (teamsId, lastAnnId) {
        if (lastAnnId === void 0) { lastAnnId = constant_1.TeamConst.START_ID; }
        return db_1.DB.Announcement.findAll({
            order: [['id', 'DESC']],
            where: {
                id: {
                    gt: lastAnnId
                },
                mainAnnouncementId: null,
                teamId: {
                    in: teamsId
                }
            },
            include: [{
                    model: db_1.DB.User,
                    include: [db_1.DB.Skill]
                }, {
                    model: db_1.DB.Announcement,
                    as: 'replies',
                    include: [{
                            model: db_1.DB.User,
                            include: [db_1.DB.Skill]
                        }]
                }]
        });
    };
    TeamDb.getLastAnnId = function (teamId, userId) {
        return db_1.DB.TeamMemberLastAnnSeen.findOne({
            where: {
                teamId: teamId,
                userId: userId
            }
        });
    };
    TeamDb.getMemberTeams = function (userId, nameCriteria) {
        if (nameCriteria === void 0) { nameCriteria = ''; }
        return db_1.DB.User.findById(userId, {
            include: [{
                    model: db_1.DB.Team,
                    as: 'teams',
                    where: {
                        name: {
                            like: "%" + nameCriteria + "%" // ?? exclude default project teams
                        }
                    },
                    include: [{
                            model: db_1.DB.User,
                            as: 'members'
                        }, {
                            model: db_1.DB.User,
                            include: [db_1.DB.Skill]
                        }]
                }]
        });
    };
    TeamDb.getLeaderTeams = function (userId, nameCriteria) {
        if (nameCriteria === void 0) { nameCriteria = ''; }
        return db_1.DB.User.findById(userId, {
            include: [{
                    model: db_1.DB.Team,
                    as: 'leader',
                    where: {
                        name: {
                            like: "%" + nameCriteria + "%" // ?? exclude default project teams
                        }
                    },
                    include: [{
                            model: db_1.DB.User,
                            as: 'members'
                        }, {
                            model: db_1.DB.User,
                            include: [db_1.DB.Skill]
                        }]
                }]
        });
    };
    TeamDb.getPublicTeams = function (teamIds, nameCriteria) {
        if (nameCriteria === void 0) { nameCriteria = ''; }
        return db_1.DB.Team.findAll({
            where: {
                id: {
                    notIn: teamIds
                },
                name: {
                    like: "%" + nameCriteria + "%"
                },
            },
            include: [{
                    model: db_1.DB.User,
                    as: 'members'
                }, {
                    model: db_1.DB.User,
                    include: [db_1.DB.Skill]
                }]
        });
    };
    // update and insert
    //*************************************************************** */
    TeamDb.announce = function (teamId, userId, message, mainAnnouncementId) {
        return db_1.DB.Announcement.create({
            message: message,
            userId: userId,
            teamId: teamId,
            mainAnnouncementId: mainAnnouncementId
        });
    };
    TeamDb.reply = function (userId, teamId, message, mainAnnouncementId) {
        return db_1.DB.Announcement.create({
            message: message,
            userId: userId,
            teamId: teamId,
            mainAnnouncementId: mainAnnouncementId
        });
        // // return new Promise((resolve, reject)=>{
        //     // return DB.Announcement.findById(mainAnnouncementId)
        //     .then((announcement:any)=>{
        //         if(announcement){
        //             let teamId:any = announcement.teamId;
        //         }
        //         return null;
        //     })
        // // })
    };
    TeamDb.updateAnnouncementSeen = function (teamId, userId, lastAnnId) {
        return db_1.DB.TeamMemberLastAnnSeen.findOne({
            where: {
                teamId: teamId,
                userId: userId
            }
        })
            .then(function (lastAnn) {
            if (lastAnn) {
                lastAnn.lastSeenAnnouncementId = lastAnnId;
                return lastAnn.save();
            }
            else {
                return db_1.DB.TeamMemberLastAnnSeen.create({
                    lastSeenAnnouncementId: lastAnnId,
                    teamId: teamId,
                    userId: userId
                });
            }
        });
    };
    TeamDb.newTeam = function (teamData) {
        return db_1.DB.Team.create(teamData);
    };
    TeamDb.addTeamMembers = function (memberData) {
        return db_1.DB.TeamUser.bulkCreate(memberData);
    };
    TeamDb.removeTeamMember = function (teamId, memberId) {
        return db_1.DB.TeamUser.destroy({
            where: {
                teamId: teamId,
                userId: {
                    in: memberId
                }
            }
        });
    };
    TeamDb.replyTeamJoinRequest = function (requestId, decision) {
        return db_1.DB.TeamUser.update({
            request: decision,
            seen: true
        }, {
            where: {
                id: requestId
            }
        });
    };
    // notification
    TeamDb.getUnseenNotificationAnnouncements = function (teamsId) {
        return db_1.DB.Announcement.findAll({
            where: {
                id: {
                    in: teamsId,
                },
                mainAnnouncementId: null,
            },
            include: [{
                    model: db_1.DB.User,
                    include: [db_1.DB.Skill]
                }, {
                    model: db_1.DB.Team,
                    include: [{
                            model: db_1.DB.TeamMemberLastAnnSeen,
                        }]
                }]
        });
    };
    TeamDb.getLastAnnIds = function (userId) {
        return db_1.DB.TeamMemberLastAnnSeen.findAll({
            where: {
                userId: userId
            }
        });
    };
    TeamDb.getUnseenTeamJoinRequests = function (userId) {
        return db_1.DB.TeamUser.findAll({
            where: {
                userId: userId,
                request: constant_1.UserConst.REQUEST.UNDECIDED,
            }
        });
    };
    TeamDb.getTeams = function (teamsId) {
        return db_1.DB.Team.findAll({
            where: {
                id: {
                    in: teamsId
                }
            }
        });
    };
    TeamDb.editTeamProfile = function (teamId, teamData) {
        return db_1.DB.Team.update(teamData, {
            where: {
                id: teamId
            }
        });
    };
    TeamDb.editAnnouncementReply = function (announcementId, newAnnouncement) {
        return db_1.DB.Announcement.update({
            message: newAnnouncement
        }, {
            where: {
                id: announcementId
            }
        });
    };
    // delete announcement when main announcement id is not given
    // delete reply when main announcement id is null
    TeamDb.removeAnnouncementReply = function (announcementId, mainAnnouncementId) {
        if (mainAnnouncementId === void 0) { mainAnnouncementId = announcementId; }
        return db_1.DB.Announcement.destroy({
            where: {
                id: announcementId
            }
            // where:DB.Sequelize.or({
            //     id:announcementId
            // },{
            //     mainAnnouncementId:mainAnnouncementId
            // })
        });
    };
    TeamDb.deleteTeam = function (teamId) {
        return db_1.DB.Team.destroy({
            where: {
                id: teamId
            }
        });
    };
    // Authorization
    //*************************************************************************************** */
    TeamDb.checkTeamLeadership = function (userId, teamId) {
        return db_1.DB.Team.findOne({
            where: {
                id: teamId,
                leaderId: userId
            }
        });
    };
    TeamDb.checkTeamMembership = function (userId, teamId) {
        return db_1.DB.TeamUser.findOne({
            where: {
                teamId: teamId,
                userId: userId,
                request: constant_1.UserConst.REQUEST.ACCEPTED
            }
        });
    };
    TeamDb.checkAnnouncementOrReplyOwnership = function (userId, annId) {
        return db_1.DB.Announcement.findOne({
            where: {
                id: annId,
                userId: userId
            }
        });
    };
    TeamDb.checkTeamJoinRequestReceiver = function (userId, requestId) {
        return db_1.DB.TeamUser.findOne({
            where: {
                id: requestId,
                userId: userId,
                request: constant_1.UserConst.REQUEST.UNDECIDED
            }
        });
    };
    return TeamDb;
}());
exports.TeamDb = TeamDb;
