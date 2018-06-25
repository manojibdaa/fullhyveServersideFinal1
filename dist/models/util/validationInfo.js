"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonCriterias = {
    id: {
        int: true,
        positive: true,
    },
    message: {
        string: true,
        required: true,
        maxLen: 5000
    },
    name: {
        required: true,
        string: true,
        maxLen: 30
    }
};
exports.validationCriterias = {
    // get methods
    offset: {
        int: true,
        minVal: 0
    },
    limit: {
        int: true,
        positive: true
    },
    // account
    userName: {
        required: true,
        string: true,
        minLen: 6,
        maxLen: 30
    },
    password: {
        required: true,
        string: true,
        minLen: 3
    },
    firstName: {
        required: true,
        string: true,
        maxLen: 20
    },
    lastName: {
        string: true,
        maxLen: 20
    },
    email: {
        string: true,
        maxLen: 255,
        email: true
    },
    image: {
        string: true,
        maxLen: 255
    },
    title: {
        string: true,
        maxLen: 50
    },
    skills: {
        string: true,
        maxLen: 30
    },
    description: {
        string: true
    },
    lastNotificationTimestamp: {
        string: true
    },
    accepted: {
        boolean: true
    },
    // ids
    friendId: exports.commonCriterias.id,
    friendIds: {
        // array:true
        required: true
    },
    requestId: exports.commonCriterias.id,
    contactId: exports.commonCriterias.id,
    contactIds: exports.commonCriterias.id,
    messageId: exports.commonCriterias.id,
    lastMessageId: exports.commonCriterias.id,
    teamId: exports.commonCriterias.id,
    announcementId: exports.commonCriterias.id,
    replyId: exports.commonCriterias.id,
    lastAnnId: exports.commonCriterias.id,
    memberId: exports.commonCriterias.id,
    memberIds: {
        array: true
    },
    projectId: exports.commonCriterias.id,
    tasksetId: exports.commonCriterias.id,
    taskId: exports.commonCriterias.id,
    teamIds: {
        array: true
    },
    individualIds: {
        array: true
    },
    assignerId: exports.commonCriterias.id,
    assigneeId: exports.commonCriterias.id,
    assigneeTeamId: {
        required: true,
        int: true
    },
    // messages
    message: exports.commonCriterias.message,
    newMessage: exports.commonCriterias.message,
    announcement: exports.commonCriterias.message,
    reply: exports.commonCriterias.message,
    newAnnouncement: exports.commonCriterias.message,
    // search names
    userSearchName: {
        required: true,
        string: true,
        maxLen: 41
    },
    teamName: exports.commonCriterias.name,
    projectName: exports.commonCriterias.name,
    // teams
    // new team
    name: exports.commonCriterias.name,
    focus: {
        required: true,
        string: true
    },
    odescription: {
        required: true,
        string: true
    },
    // new project
    field: {
        required: true,
        string: true,
        maxLen: 255
    },
    number: {
        int: true,
        positive: true
    },
    // new task
    ttitle: {
        string: true,
        maxLen: 30
    },
    deadline: {
        required: true,
        int: true
    },
    taskStatus: {
        listval: ['approve', 'revise']
    }
};
exports.actionRequiredFields = {
    userConnected: {
        fields: ['id'],
        alias: null
    },
    signin: {
        fields: ['userName', 'password'],
        alias: null
    },
    signup: {
        fields: ['firstName', 'lastName' /*,'email'*/, 'userName', 'password'],
        alias: null
    },
    editProfile: {
        fields: ['firstName', 'lastName', /*'email',*/ 'image', 'title', 'skills', 'description'],
        alias: null
    },
    addFriend: {
        fields: ['friendId'],
        alias: null
    },
    getUserProfile: {
        fields: ['friendId'],
        alias: null
    },
    replyFriendRequest: {
        fields: ['requestId', 'accepted'],
        alias: null
    },
    unfriend: {
        fields: ['friendId'],
        alias: null
    },
    getNotifications: {
        fields: ['offset', 'limit' /*,'lastNotificationTimestamp'*/],
        alias: null
    },
    sendMessage: {
        fields: ['friendId', 'message'],
        alias: null
    },
    editMessage: {
        fields: ['messageId', 'newMessage'],
        alias: null
    },
    forwardMessage: {
        fields: ['friendIds', 'messageId'],
        alias: null
    },
    deleteMessage: {
        fields: ['messageId'],
        alias: null
    },
    updateMessageSeen: {
        fields: ['lastMessageId'],
        alias: null
    },
    getFriendLastSeenTime: {
        fields: ['friendId'],
        alias: null
    },
    getMessages: {
        fields: ['friendId', 'offset', 'limit'],
        alias: null
    },
    getFriends: {
        fields: ['offset', 'limit'],
        alias: null
    },
    searchUsers: {
        fields: ['name', 'offset', 'limit'],
        alias: {
            'name': 'userSearchName'
        }
    },
    //teams
    getMyTeams: {
        fields: ['offset', 'limit'],
        alias: null
    },
    searchTeams: {
        fields: ['name', 'offset', 'limit'],
        alias: {
            'name': 'teamName'
        }
    },
    getTeamMembers: {
        fields: ['teamId', 'offset', 'limit'],
        alias: null
    },
    getTeamProjects: {
        fields: ['teamId', 'offset', 'limit'],
        alias: null
    },
    getTeamAnnouncements: {
        fields: ['teamId', 'offset', 'limit'],
        alias: null
    },
    announce: {
        fields: ['message', 'teamId'],
        alias: null
    },
    deleteAnnouncement: {
        fields: ['announcementId'],
        alias: null
    },
    replyAnnouncement: {
        fields: ['message', 'teamId', 'mainAnnouncementId'],
        alias: null
    },
    editAnnouncementReply: {
        fields: ['announcementId', 'newAnnouncement'],
        alias: null
    },
    deleteReply: {
        fields: ['replyId'],
        alias: null
    },
    updateAnnouncementSeen: {
        fields: ['teamId', 'lastAnnId'],
        alias: null
    },
    newTeam: {
        fields: ['name', 'image', 'focus', 'description'],
        alias: {
            'description': 'odescription'
        }
    },
    editTeamProfile: {
        fields: ['name', 'image', 'description'],
        alias: null
    },
    addMembers: {
        fields: ['teamId', 'memberIds'],
        alias: null
    },
    removeMembers: {
        fields: ['teamId', 'memberIds'],
        alias: null
    },
    replyTeamJoinRequest: {
        fields: ['requestId', 'accepted'],
        alias: null
    },
    deleteTeam: {
        fields: ['teamId'],
        alias: null
    },
    // project
    getMyProjects: {
        fields: ['offset', 'limit'],
        alias: null
    },
    searchProjects: {
        fields: ['name', 'offset', 'limit'],
        alias: {
            'name': 'projectName'
        }
    },
    getContributors: {
        fields: ['projectId', 'offset', 'limit'],
        alias: null
    },
    getTasksets: {
        fields: ['projectId', 'offset', 'limit'],
        alias: null
    },
    getTasks: {
        fields: ['projectId', 'tasksetId', 'offset', 'limit'],
        alias: null
    },
    newProject: {
        fields: ['name', 'image', 'field', 'description'],
        alias: {
            'description': 'odescription'
        }
    },
    addContributors: {
        fields: ['projectId', 'teamIds', 'individualIds'],
        alias: null
    },
    removeContributors: {
        fields: ['projectId', 'teamIds', 'individualIds'],
        alias: null
    },
    replyIndividualContributorJoinRequest: {
        fields: ['requestId', 'accepted'],
        alias: null
    },
    replyTeamContributorJoinRequest: {
        fields: ['requestId', 'accepted'],
        alias: null
    },
    editProjectDetails: {
        fields: ['name', 'image', 'field', 'description'],
        alias: null
    },
    deleteProject: {
        fields: ['projectId'],
        alias: null
    },
    newTaskset: {
        fields: ['name', 'deadline', 'description', 'projectId'],
        alias: {
            'description': 'odescription'
        }
    },
    removeTaskset: {
        fields: ['projectId', 'tasksetId'],
        alias: null
    },
    newTask: {
        fields: ['title', 'description', 'deadline', 'assignerId', 'assigneeId', 'assigneeTeamId', 'tasksetId', 'projectId'],
        alias: {
            'title': 'ttitle',
            'description': 'odescription'
        }
    },
    startTask: {
        fields: ['projectId', 'taskId'],
        alias: null
    },
    completeTask: {
        fields: ['projectId', 'taskId'],
        alias: null
    },
    changeTaskStatus: {
        fields: ['projectId', 'taskId', 'taskStatus'],
        alias: null
    },
    removeTask: {
        fields: ['projectId', 'taskId'],
        alias: null
    },
};
