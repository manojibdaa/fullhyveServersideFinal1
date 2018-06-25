"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authorizationMR_1 = require("../../middlewares/authorizationMR");
exports.requiredAuthorization = {
    // account
    unfriend: [authorizationMR_1.Authorization.verifyFriendship],
    replyFriendRequest: [authorizationMR_1.Authorization.verifyFriendRequestReceiver],
    // chat
    sendMessage: [authorizationMR_1.Authorization.verifyFriendship],
    editMessage: [authorizationMR_1.Authorization.verifyMessageSender],
    forwardMessage: [authorizationMR_1.Authorization.verifyMessageRecSendNew],
    deleteMessage: [authorizationMR_1.Authorization.verifyMessageSender],
    getFriendLastSeenTime: [authorizationMR_1.Authorization.verifyFriendship],
    // team
    getTeamAnnouncements: [authorizationMR_1.Authorization.verifyTeamMembership],
    getTeamMembers: [authorizationMR_1.Authorization.verifyTeamMembership],
    getTeamProjects: [authorizationMR_1.Authorization.verifyTeamMembership],
    announce: [authorizationMR_1.Authorization.verifyTeamMembership],
    replyAnnouncement: [authorizationMR_1.Authorization.verifyTeamMembership],
    deleteAnnouncement: [authorizationMR_1.Authorization.verifyAnnouncementOrReplyOwnership],
    deleteReply: [authorizationMR_1.Authorization.verifyAnnouncementOrReplyOwnership],
    editAnnouncementReply: [authorizationMR_1.Authorization.verifyAnnouncementOrReplyOwnership],
    addMembers: [authorizationMR_1.Authorization.verifyTeamLeadership],
    replyTeamJoinRequest: [authorizationMR_1.Authorization.verifyTeamJoinRequestReceiver],
    removeMembers: [authorizationMR_1.Authorization.verifyTeamLeadership],
    // project
    getContributors: [authorizationMR_1.Authorization.verifyProjectContributor],
    getTasksets: [authorizationMR_1.Authorization.verifyProjectContributor],
    getTasks: [authorizationMR_1.Authorization.verifyProjectContributor],
    addContributors: [authorizationMR_1.Authorization.verifyProjectLeadership],
    replyTeamContributorJoinRequest: [authorizationMR_1.Authorization.verifyTeamContributorRequestReceiver],
    replyIndividualContributorJoinRequest: [authorizationMR_1.Authorization.verifyIndividualContributorRequestReceiver],
    newTaskset: [authorizationMR_1.Authorization.verifyProjectLeadership],
    newTask: [authorizationMR_1.Authorization.verifyProjectLeadership],
    startTask: [authorizationMR_1.Authorization.verifyTaskAssignee],
    completeTask: [authorizationMR_1.Authorization.verifyTaskAssignee],
    changeTaskStatus: [authorizationMR_1.Authorization.verifyProjectLeadership],
    removeContributors: [authorizationMR_1.Authorization.verifyProjectLeadership]
};
