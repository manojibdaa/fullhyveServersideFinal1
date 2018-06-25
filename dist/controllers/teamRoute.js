"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var teamM_1 = require("../middlewares/teamM");
var validateM_1 = require("../middlewares/validateM");
var authorizationM_1 = require("../middlewares/authorizationM");
// const routers: express.Router = express.Router();
// // get all my teams including ones i created
// routers.post('/getMyTeams', TeamM.getMyTeams);
// routers.post('/searchTeams', TeamM.searchTeams);
// routers.post('/getTeamMembers', Authorization.verifyTeamMembership, TeamM.getTeamMembers);
// routers.post('/getTeamProjects', Authorization.verifyTeamMembership, TeamM.getTeamProjects);
// routers.post('/getTeamAnnouncements', Authorization.verifyTeamMembership, TeamM.getTeamAnnouncement);
// //routers.post('/getTeamDetailGraph', TeamM.getGraph);
// routers.post('/announce', Authorization.verifyTeamMembership, TeamM.announceAndReply);
// routers.post('/reply', Authorization.verifyTeamMembership, TeamM.announceAndReply);
// routers.post('/updateAnnouncementSeen', Authorization.verifyTeamMembership, TeamM.updateAnnouncementSeen);
// //routers.post('/setTeamLogo', UploadM.upload, TeamM.setTeamLogo);
// //managing routes
// routers.post('/newTeam', ValidateM.validateNewTeam, TeamM.addNewTeam);
// routers.post('/addMembers', Authorization.verifyTeamLeadership, TeamM.addTeamMember);
// routers.post('/removeMembers', Authorization.verifyTeamLeadership, TeamM.removeTeamMember);
// routers.post('/replyTeamJoinRequest/:decision', Authorization.verifyTeamJoinRequestReceiver, TeamM.replyTeamJoinRequest);
// // to be added?????????????????????????????
// routers.post('/editAnnouncementReply', Authorization.verifyAnnouncementOrReplyOwnership, TeamM.editAnnouncementReply);
// routers.post('/deleteAnnouncement', Authorization.verifyAnnouncementOrReplyOwnership, TeamM.deleteAnnouncement);
// routers.post('/deleteReply', Authorization.verifyAnnouncementOrReplyOwnership, TeamM.deleteReply);
// routers.post('/editTeamProfile', Authorization.verifyTeamLeadership, TeamM.editTeamProfile);
// routers.post('/deleteTeam', Authorization.verifyTeamLeadership, TeamM.deleteTeam);
// routers.post('/getMyTeamProfile', Authorization.verifyTeamLeadership, TeamM.getTeamProfile);
// export = routers;
var TeamR = /** @class */ (function () {
    function TeamR() {
    }
    TeamR.init = function () {
        var routers = express.Router();
        // get all my teams including ones i created
        routers.post('/getMyTeams', teamM_1.TeamM.getMyTeams);
        routers.post('/searchTeams', teamM_1.TeamM.searchTeams);
        routers.post('/getTeamMembers', authorizationM_1.Authorization.verifyTeamMembership, teamM_1.TeamM.getTeamMembers);
        routers.post('/getTeamProjects', authorizationM_1.Authorization.verifyTeamMembership, teamM_1.TeamM.getTeamProjects);
        routers.post('/getTeamAnnouncements', authorizationM_1.Authorization.verifyTeamMembership, teamM_1.TeamM.getTeamAnnouncement);
        //routers.post('/getTeamDetailGraph', TeamM.getGraph);
        routers.post('/announce', authorizationM_1.Authorization.verifyTeamMembership, teamM_1.TeamM.announceAndReply);
        routers.post('/reply', authorizationM_1.Authorization.verifyTeamMembership, teamM_1.TeamM.announceAndReply);
        routers.post('/updateAnnouncementSeen', authorizationM_1.Authorization.verifyTeamMembership, teamM_1.TeamM.updateAnnouncementSeen);
        //routers.post('/setTeamLogo', UploadM.upload, TeamM.setTeamLogo);
        //managing routes
        routers.post('/newTeam', validateM_1.ValidateM.validateNewTeam, teamM_1.TeamM.addNewTeam);
        routers.post('/addMembers', authorizationM_1.Authorization.verifyTeamLeadership, teamM_1.TeamM.addTeamMember);
        routers.post('/removeMembers', authorizationM_1.Authorization.verifyTeamLeadership, teamM_1.TeamM.removeTeamMember);
        routers.post('/replyTeamJoinRequest/:decision', authorizationM_1.Authorization.verifyTeamJoinRequestReceiver, teamM_1.TeamM.replyTeamJoinRequest);
        // to be added?????????????????????????????
        routers.post('/editAnnouncementReply', authorizationM_1.Authorization.verifyAnnouncementOrReplyOwnership, teamM_1.TeamM.editAnnouncementReply);
        routers.post('/deleteAnnouncement', authorizationM_1.Authorization.verifyAnnouncementOrReplyOwnership, teamM_1.TeamM.deleteAnnouncement);
        routers.post('/deleteReply', authorizationM_1.Authorization.verifyAnnouncementOrReplyOwnership, teamM_1.TeamM.deleteReply);
        routers.post('/editTeamProfile', authorizationM_1.Authorization.verifyTeamLeadership, teamM_1.TeamM.editTeamProfile);
        routers.post('/deleteTeam', authorizationM_1.Authorization.verifyTeamLeadership, teamM_1.TeamM.deleteTeam);
        routers.post('/getMyTeamProfile', authorizationM_1.Authorization.verifyTeamLeadership, teamM_1.TeamM.getTeamProfile);
        return routers;
    };
    return TeamR;
}());
exports.TeamR = TeamR;
