import { Authorization } from "../../middlewares/authorizationMR";

export const requiredAuthorization:any = {
    // account
    unfriend:[Authorization.verifyFriendship],
    replyFriendRequest:[Authorization.verifyFriendRequestReceiver],

    // chat
    sendMessage:[Authorization.verifyFriendship],
    editMessage:[Authorization.verifyMessageSender],
    forwardMessage:[Authorization.verifyMessageRecSendNew],
    deleteMessage:[Authorization.verifyMessageSender],
    getFriendLastSeenTime:[Authorization.verifyFriendship],

    // team
    getTeamAnnouncements:[Authorization.verifyTeamMembership],
    getTeamMembers:[Authorization.verifyTeamMembership],
    getTeamProjects:[Authorization.verifyTeamMembership],
    announce:[Authorization.verifyTeamMembership],
    replyAnnouncement:[Authorization.verifyTeamMembership],
    deleteAnnouncement:[Authorization.verifyAnnouncementOrReplyOwnership],
    deleteReply:[Authorization.verifyAnnouncementOrReplyOwnership],
    editAnnouncementReply:[Authorization.verifyAnnouncementOrReplyOwnership],
    addMembers:[Authorization.verifyTeamLeadership],
    replyTeamJoinRequest:[Authorization.verifyTeamJoinRequestReceiver],
    removeMembers:[Authorization.verifyTeamLeadership],

    // project
    getContributors:[Authorization.verifyProjectContributor],
    getTasksets:[Authorization.verifyProjectContributor],
    getTasks:[Authorization.verifyProjectContributor],
    addContributors:[Authorization.verifyProjectLeadership],
    replyTeamContributorJoinRequest:[Authorization.verifyTeamContributorRequestReceiver],
    replyIndividualContributorJoinRequest:[Authorization.verifyIndividualContributorRequestReceiver],
    newTaskset:[Authorization.verifyProjectLeadership],
    newTask:[Authorization.verifyProjectLeadership],
    startTask:[Authorization.verifyTaskAssignee],
    completeTask:[Authorization.verifyTaskAssignee],
    changeTaskStatus:[Authorization.verifyProjectLeadership],
    removeContributors:[Authorization.verifyProjectLeadership]
    

}